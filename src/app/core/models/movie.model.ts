export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SearchMovieDto {
  query: string;
}

export interface GenresResponseDto {
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface DiscoverMoviesDto {
  page?: number;
  year?: number;
  with_genres?: string | number;
}

export interface SearchMovieDto {
  query: string;
}

export interface PaginatedMovieResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
