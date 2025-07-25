import { Movie } from './movie.model';

export interface CreateMovieListDto {
  name: string;
  description?: string;
  genreId: number;
  genreName: string;
}

export interface AddMovieToListDto {
  listId: string;
  movieId: number;
}

export interface RemoveMovieFromListDto {
  listId: string;
  movieId: number;
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
export interface MovieListResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string;
    genreId: number;
    genreName: string;
    userId: string;
    movies: any[];
  };
}

