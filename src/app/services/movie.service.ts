import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../core/models/api-response';
import {
  DiscoverMoviesDto,
  GenresResponseDto,
  Movie,
  PaginatedMovieResponse,
  SearchMovieDto,
} from '../core/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/movies`;

  getGenres(): Observable<GenresResponseDto> {
    return this.http
      .get<ApiResponse<GenresResponseDto>>(`${this.apiUrl}/genres`)
      .pipe(map(({ data }) => data));
  }

  searchMoviesByName({
    query,
  }: SearchMovieDto): Observable<PaginatedMovieResponse<Movie>> {
    const params = new HttpParams().set('query', query);

    return this.http
      .get<ApiResponse<PaginatedMovieResponse<Movie>>>(
        `${this.apiUrl}/search`,
        { params }
      )
      .pipe(map(({ data }) => data));
  }

  getPopularMovies(): Observable<PaginatedMovieResponse<Movie>> {
    return this.http
      .get<ApiResponse<PaginatedMovieResponse<Movie>>>(`${this.apiUrl}/popular`)
      .pipe(map(({ data }) => data));
  }

  getNowPlayingMovies(
    page: number = 1
  ): Observable<PaginatedMovieResponse<Movie>> {
    const params = new HttpParams().set('page', page.toString());

    return this.http
      .get<ApiResponse<PaginatedMovieResponse<Movie>>>(
        `${this.apiUrl}/now-playing`,
        { params }
      )
      .pipe(map(({ data }) => data));
  }

  discoverMovies({
    page,
    year,
    with_genres,
  }: DiscoverMoviesDto): Observable<PaginatedMovieResponse<Movie>> {
    let params = new HttpParams().set('page', page?.toString() ?? '1');
    if (year) {
      params = params.set('year', year.toString());
    }
    if (with_genres) {
      params = params.set('with_genres', with_genres.toString());
    }
    return this.http
      .get<ApiResponse<PaginatedMovieResponse<Movie>>>(
        `${this.apiUrl}/discover`,
        { params }
      )
      .pipe(map(({ data }) => data));
  }
}
