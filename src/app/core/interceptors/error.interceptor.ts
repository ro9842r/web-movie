import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = getErrorMessage(error);

      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMsg,
        life: 3000,
      });

      return throwError(() => new Error(errorMsg));
    })
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Network error: Connection failed.';
  }

  switch (error.status) {
    case 400:
      return error.error?.message || 'Bad request';
    case 401:
      return 'Session expired. Please log in again.';
    case 403:
      return 'You do not have permission.';
    case 404:
      return 'Resource not found.';
    case 500:
      return 'Server error. Try again later.';
    default:
      return error.error?.message || `Error ${error.status}: ${error.message}`;
  }
}
