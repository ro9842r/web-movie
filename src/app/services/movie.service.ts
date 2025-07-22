import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { GenresResponseDto } from '../core/models/genres-response.dto';
import { ApiResponse } from '../core/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getGenres(): Observable<GenresResponseDto> {
    return this.http
      .get<ApiResponse<GenresResponseDto>>(`${this.apiUrl}/movies/genres`)
      .pipe(map(({ data }) => data));
  }
}
