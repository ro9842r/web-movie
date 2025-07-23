import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { MovieService } from '../../services/movie.service';
import { MovieListService } from '../../services/movie-list.service';
import {
  debounceTime,
  Subject,
  switchMap,
  Observable,
  of,
  takeUntil,
  tap,
  catchError,
  forkJoin,
} from 'rxjs';

import { FormsModule } from '@angular/forms';
import { Movie, GenresResponseDto } from '../../core/models/movie.model';
import { AddMovieToListDto } from '../../core/models/movie-list.model';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-movie-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ProgressSpinnerModule,
    PaginatorModule,
  ],
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.scss'],
})
export class AddMovieModalComponent implements OnInit, OnDestroy {
  @Input() visible = false;
  @Input() listId: string | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() moviesAdded = new EventEmitter<Movie[]>();

  searchQuery = '';
  selectedGenre: number | null = null;
  selectedYear: number | null = null;

  movies: any[] = [];
  selectedMovies = new Set<number>();

  loading = false;
  isInitialState = true;

  currentPage = 1;
  totalPages = 1;
  totalResults = 0;
  genres: Genre[] = [];
  years: number[] = [];

  private readonly searchTrigger$ = new Subject<void>();
  private readonly ngUnsubscribe = new Subject<void>();

  constructor(
    private readonly movieService: MovieService,
    private readonly movieListService: MovieListService
  ) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.movieService.getMovieGenres().subscribe({
      next: (response: GenresResponseDto) => {
        this.genres = response.genres;
      },
      error: (error) => {
        console.error('Error loading genres:', error);
      },
    });

    this.searchTrigger$
      .pipe(
        debounceTime(500),
        tap(() => {
          this.loading = true;
          this.isInitialState = false;
        }),
        switchMap(() => {
          if (this.searchQuery.trim()) {
            return this.performSearch(this.searchQuery);
          } else {
            return this.discoverMovies();
          }
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.movies = response.results;
          this.totalPages = response.total_pages;
          this.totalResults = response.total_results;
          this.loading = false;
        },
        error: (error) => {
          console.error('Search/Filter error:', error);
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSearchInput(event: any): void {
    this.searchQuery = event.target.value;
    this.currentPage = 1;
    this.searchTrigger$.next();
  }

  searchMovies(): void {
    this.currentPage = 1;
    this.searchTrigger$.next();
  }

  discoverMoviesTrigger(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.searchTrigger$.next();
  }

  performSearch(query: string): Observable<any> {
    const searchParams = {
      query,
      page: this.currentPage,
    };

    console.log('Performing search with params:', searchParams);

    return this.movieService.searchMoviesByName(searchParams).pipe(
      tap((response) => console.log('Search response:', response)),
      catchError((error) => {
        console.error('Search API Error:', error);
        return of({ results: [], total_pages: 0, total_results: 0, page: 0 });
      })
    );
  }

  discoverMovies(): Observable<any> {
    const discoverParams = {
      page: this.currentPage,
      ...(this.selectedGenre && { with_genres: this.selectedGenre.toString() }),
      ...(this.selectedYear && { year: this.selectedYear }),
    };

    return this.movieService.discoverMovies(discoverParams).pipe(
      catchError((error) => {
        console.error('Discover API Error:', error);
        return of({ results: [], total_pages: 0, total_results: 0, page: 0 });
      })
    );
  }

  onGenreChange(): void {
    this.currentPage = 1;
    this.searchTrigger$.next();
  }

  onYearChange(): void {
    this.currentPage = 1;
    this.searchTrigger$.next();
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    console.log('Page changed to:', this.currentPage);
    this.searchTrigger$.next();
  }

  selectMovie(movie: Movie): void {
    if (this.selectedMovies.has(movie.id)) {
      this.selectedMovies.delete(movie.id);
    } else {
      this.selectedMovies.add(movie.id);
    }
  }

  addSelectedMovies(): void {
    if (!this.listId) {
      console.error('List ID is not available.');
      return;
    }

    const moviesToAdd: AddMovieToListDto[] = this.movies
      .filter((movie) => this.selectedMovies.has(movie.id))
      .map((movie) => ({
        listId: this.listId as string,
        movieId: movie.id,
      }));

    if (moviesToAdd.length > 0) {
      forkJoin(
        moviesToAdd.map((dto) => this.movieListService.addMovieToList(dto))
      ).subscribe({
        next: (responses) => {
          console.log('Movies added successfully:', responses);
          this.moviesAdded.emit(responses.map((res) => res.movies[0])); // Assuming the response returns the added movie
          this.onClose();
        },
        error: (error) => {
          console.error('Error adding movies:', error);
          // Handle error (e.g., show a message to the user)
        },
      });
    } else {
      this.onClose();
    }
  }

  getMoviePosterUrl(posterPath: string | null): string {
    if (!posterPath || posterPath.trim() === '') {
      return '/assets/img/default_poster.jpg';
    }
    return `https://image.tmdb.org/t/p/w300${posterPath}`;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    // Only attempt to set fallback if it hasn't been set already
    if (imgElement.src !== '/assets/img/no-poster.jpg') {
      imgElement.src = '/assets/img/no-poster.jpg';
    }
    // Remove the onerror attribute to prevent further calls for this image
    imgElement.onerror = null;
  }

  clearResults(): void {
    this.movies = [];
    this.selectedMovies.clear();
    this.isInitialState = true;
    this.currentPage = 1;
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.clearResults();
    this.searchQuery = '';
    this.selectedGenre = null;
    this.selectedYear = null;
  }
}
