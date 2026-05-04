import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ServicesConnexion } from './services-connexion';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const servicesConnexion = inject(ServicesConnexion);
  const router = inject(Router);
  const token = servicesConnexion.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expiré → déconnexion et redirection
          servicesConnexion.logout();
          router.navigate(['/connexion']);
        }
        return throwError(() => error);
      })
    );
  }
  return next(req);
};
