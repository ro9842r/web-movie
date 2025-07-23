import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieListService } from '../../services/movie-list.service';
import { MovieListResponse } from '../../core/models/movie-list.model';
import { Movie } from '../../core/models/movie.model';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AddMovieModalComponent } from '../../components/add-movie-modal/add-movie-modal.component';

@Component({
  selector: 'app-movie-list-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    ConfirmDialogModule,
    AddMovieModalComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './movie-list-detail.component.html',
})
export class MovieListDetailComponent implements OnInit {
  movieList: WritableSignal<MovieListResponse['data'] | null> = signal(null);
  loading = signal(true);
  error = signal<string | null>(null);
  showAddMovieModal = signal(false);

  private readonly route = inject(ActivatedRoute);
  private readonly movieListService = inject(MovieListService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const listId = params.get('id');
      if (listId) {
        this.loadMovieList(listId);
      } else {
        this.error.set('Movie list ID not provided.');
        this.loading.set(false);
      }
    });
  }

  loadMovieList(listId: string): void {
    this.loading.set(true);
    console.log(this.movieList());
    this.movieListService.getMovieListById(listId).subscribe({
      next: (response) => {
        console.log(response);
        this.movieList.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error loading movie list.');
        this.loading.set(false);
      },
    });
  }

  openAddMovieModal(): void {
    this.showAddMovieModal.set(true);
  }

  confirmMovieRemoval(movieId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this movie from the list?',
      header: 'Remove Movie',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => this.removeMovie(movieId),
    });
  }

  removeMovie(movieId: number): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (!listId) {
      this.error.set('Cannot remove movie without a list ID.');
      return;
    }

    const originalMovies = this.movieList()?.movies || [];

    this.movieList.update((list) => {
      if (list) {
        const updatedMovies = list.movies.filter(
          (movie) => movie.movieDetails.id !== movieId
        );
        return { ...list, movies: updatedMovies };
      }
      return list;
    });

    this.movieListService.removeMovieFromList({ listId, movieId }).subscribe({
      error: (err) => {
        this.error.set('Failed to remove movie. Please try again.');
        // Revert the optimistic update on error
        this.movieList.update((list) => {
          if (list) {
            return { ...list, movies: originalMovies };
          }
          return list;
        });
      },
    });
  }

  onMoviesAdded(movies: Movie[]): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.loadMovieList(listId);
    }
  }
}
