import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error.status === 401) {
          localStorage.removeItem('token'); // Optional: clean token
          router.navigate(['/login']);
        }
      }
    })
  );
};
