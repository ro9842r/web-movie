import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Session expired. Please log in again.',
          life: 5000,
        });

        if (!router.url.includes('/login')) {
          router.navigate(['/login']);
        }
      } else if (error.status === 500) {
        return throwError(() => new Error('Erro 500: Server Error'));
      } else if (error.status === 0) {
        return throwError(
          () => new Error('Network error: Unable to connect to the server')
        );
      }
      return throwError(() => error);
    })
  );
};
