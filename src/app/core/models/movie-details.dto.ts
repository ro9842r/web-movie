export interface MovieDetailsDto {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
}
