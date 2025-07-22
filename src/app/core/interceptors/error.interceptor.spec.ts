import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  HttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { errorInterceptor } from './error.interceptor';
import { MessageService } from 'primeng/api';

describe('errorInterceptor (functional)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        MessageService,
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
    spyOn(messageService, 'add');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle 401 error and show toast', () => {
    http.get('/api/test').subscribe({
      error: () => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'Error',
          detail: 'Session expired. Please log in again.',
          life: 5000,
        });
      },
    });

    const req = httpMock.expectOne('/api/test');
    req.flush(null, { status: 401, statusText: 'Unauthorized' });
  });

  it('should show network error message', () => {
    http.get('/api/test').subscribe({
      error: (err) => {
        expect(err.message).toContain('Network error');
      },
    });

    const req = httpMock.expectOne('/api/test');
    req.error(new ProgressEvent('error'));
  });
});
