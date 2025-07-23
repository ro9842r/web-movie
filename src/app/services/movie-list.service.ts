import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../core/models/api-response';
import {
  CreateMovieListDto,
  MovieListDto,
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
}
