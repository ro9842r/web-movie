import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListService } from '../../services/movie-list.service';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MovieListResponse } from '../../core/models/movie-list.model';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-lists-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
  ],
  templateUrl: './movie-lists-overview.component.html',
  styleUrls: ['./movie-lists-overview.component.scss'],
})
export class MovieListsOverviewComponent implements OnInit, OnDestroy {
  movieLists: MovieListResponse['data'][] = [];
  loading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private readonly movieListService: MovieListService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadMovieLists();

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadMovieLists();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMovieLists(): void {
    this.loading = true;
    this.movieListService.getAllMovieLists().subscribe({
      next: (response) => {
        this.movieLists = response.data.items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading movie lists', err);
        this.error = 'Failed to load movie lists.';
        this.loading = false;
      },
    });
  }
}
