import { ApiResponse } from '../../core/models/api-response';
import {
  GenresResponseDto,
  Movie,
  PaginatedMovieResponse,
} from '../../core/models/movie.model';

export const mockGenresResponse: ApiResponse<GenresResponseDto> = {
  statusCode: 200,
  message: 'Success',
  data: {
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Comedy' },
    ],
  },
};

export const mockPaginatedMovieResponse: ApiResponse<
  PaginatedMovieResponse<Movie>
> = {
  statusCode: 200,
  message: 'Success',
  data: {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Movie 1',
        overview: 'Overview 1',
        release_date: '2023-01-01',
        genre_ids: [1],
        poster_path: '/movie1.jpg',
        backdrop_path: '/backdrop1.jpg',
        vote_average: 8.0,
        adult: false,
        original_language: 'en',
        original_title: 'Movie 1',
        popularity: 50,
        video: false,
        vote_count: 500,
      },
      {
        id: 2,
        title: 'Movie 2',
        overview: 'Overview 2',
        release_date: '2023-02-01',
        genre_ids: [2],
        poster_path: '/movie2.jpg',
        backdrop_path: '/backdrop2.jpg',
        vote_average: 7.2,
        adult: false,
        original_language: 'en',
        original_title: 'Movie 2',
        popularity: 40,
        video: false,
        vote_count: 400,
      },
    ],
    total_pages: 10,
    total_results: 100,
  },
};
