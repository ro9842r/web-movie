// src/app/services/movie.service.spec.ts
import {
  HttpTestingController,
  TestRequest,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  mockGenresResponse,
  mockPaginatedMovieResponse,
} from './mocks/movie.mocks';
import { MovieService } from './movie.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { errorInterceptor } from '../core/interceptors/error.interceptor';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/v1/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useValue: errorInterceptor,
          multi: true,
        },
        {
          useValue: {
            add: jasmine.createSpy('add'),
          },
        },
      ],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getGenres', () => {
    it('should return genres', () => {
      service.getGenres().subscribe((data) => {
        expect(data).toEqual(mockGenresResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(`${apiUrl}/genres`);
      expect(req.request.method).toBe('GET');
      req.flush(mockGenresResponse);
    });

    it('should handle error', () => {
      service.getGenres().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain(
            'Http failure response for http://localhost:3000/api/v1/movies/genres: 500 Server Error'
          );
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/genres`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('searchMoviesByName', () => {
    it('should return movies by name', () => {
      const query = 'Movie';
      service.searchMoviesByName({ query }).subscribe((data) => {
        expect(data).toEqual(mockPaginatedMovieResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(
        `${apiUrl}/search?query=${query}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPaginatedMovieResponse);
    });

    it('should handle error', () => {
      const query = 'Movie';
      service.searchMoviesByName({ query }).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain(
            `Http failure response for ${apiUrl}/search?query=${query}: 500 Server Error`
          );
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/search?query=${query}`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getPopularMovies', () => {
    it('should return popular movies', () => {
      service.getPopularMovies().subscribe((data) => {
        expect(data).toEqual(mockPaginatedMovieResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(`${apiUrl}/popular`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPaginatedMovieResponse);
    });

    it('should handle error', () => {
      service.getPopularMovies().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain(
            'Http failure response for http://localhost:3000/api/v1/movies/popular: 500 Server Error'
          );
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/popular`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should return now playing movies with default page', () => {
      service.getNowPlayingMovies().subscribe((data) => {
        expect(data).toEqual(mockPaginatedMovieResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(
        `${apiUrl}/now-playing?page=1`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      req.flush(mockPaginatedMovieResponse);
    });

    it('should return now playing movies with custom page', () => {
      const page = 2;
      service.getNowPlayingMovies(page).subscribe((data) => {
        expect(data).toEqual(mockPaginatedMovieResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(
        `${apiUrl}/now-playing?page=${page}`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe(page.toString());
      req.flush(mockPaginatedMovieResponse);
    });

    it('should handle error', () => {
      service.getNowPlayingMovies().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain(
            'Http failure response for http://localhost:3000/api/v1/movies/now-playing?page=1: 500 Server Error'
          );
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/now-playing?page=1`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('discoverMovies', () => {
    it('should discover movies with minimal params', () => {
      const params = { page: 1 };
      service.discoverMovies(params).subscribe((data) => {
        expect(data).toEqual(mockPaginatedMovieResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(`${apiUrl}/discover?page=1`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.has('year')).toBeFalse();
      expect(req.request.params.has('with_genres')).toBeFalse();
      req.flush(mockPaginatedMovieResponse);
    });

    it('should discover movies with all params', () => {
      const params = { page: 1, year: 2023, with_genres: 28 };
      service.discoverMovies(params).subscribe((data) => {
        expect(data).toEqual(mockPaginatedMovieResponse.data);
      });

      const req: TestRequest = httpMock.expectOne(
        `${apiUrl}/discover?page=1&year=2023&with_genres=28`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('year')).toBe('2023');
      expect(req.request.params.get('with_genres')).toBe('28');
      req.flush(mockPaginatedMovieResponse);
    });

    it('should handle error', () => {
      const params = { page: 1 };
      service.discoverMovies(params).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain(
            'Http failure response for http://localhost:3000/api/v1/movies/discover?page=1: 500 Server Error'
          );
        },
      });

      const req = httpMock.expectOne(`${apiUrl}/discover?page=1`);
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });
});
