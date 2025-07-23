import { Movie } from './movie.model';

export interface CreateMovieListDto {
  name: string;
  description?: string;
  genreId: number;
  genreName: string;
}

export interface MovieListDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  description: string;
  genreId: number;
  genreName: string;
  userId: string;
  movies: Array<Movie>;
}
