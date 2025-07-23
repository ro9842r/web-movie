import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../core/models/api-response';
import {
  CreateMovieListDto,
  MovieListDto,
  AddMovieToListDto,
} from '../core/models/movie-list.model';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/movie-lists`;

  createList(dto: CreateMovieListDto): Observable<MovieListDto> {
    return this.http
      .post<ApiResponse<MovieListDto>>(`${this.apiUrl}`, dto)
      .pipe(map(({ data }) => data));
  }

  getAllMovieLists(): Observable<ApiResponse<any>> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe()
      .pipe(map((res) => res));
  }

  getMovieListById(id: string): Observable<ApiResponse<MovieListDto>> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addMovieToList(dto: AddMovieToListDto): Observable<MovieListDto> {
    return this.http
      .post<ApiResponse<MovieListDto>>(`${this.apiUrl}/movie`, dto)
      .pipe(map(({ data }) => data));
  }

  removeMovieFromList(body: any): Observable<MovieListDto> {
    return this.http
      .delete<ApiResponse<MovieListDto>>(`${this.apiUrl}/movie`, {
        body: { listId: body.listId, movieId: body.movieId },
      })
      .pipe(map(({ data }) => data));
  }
}
