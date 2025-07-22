import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { GenresResponseDto } from '../core/models/genres-response.dto';
import { ApiResponse } from '../core/models/api-response';

export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getGenres(): Observable<GenresResponseDto> {
    return this.http
      .get<ApiResponse<GenresResponseDto>>(`${this.apiUrl}/genre/movie/list`)
      .pipe(map(({ data }) => data));
  }
}
