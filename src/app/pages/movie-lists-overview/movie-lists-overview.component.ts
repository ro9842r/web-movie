import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListService } from '../../services/movie-list.service';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MovieListResponse } from '../../core/models/movie-list.model';

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
export class MovieListsOverviewComponent implements OnInit {
  movieLists: MovieListResponse['data'][] = [];
  loading = true;
  error: string | null = null;

  constructor(private readonly movieListService: MovieListService) {}

  ngOnInit(): void {
    this.loadMovieLists();
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
