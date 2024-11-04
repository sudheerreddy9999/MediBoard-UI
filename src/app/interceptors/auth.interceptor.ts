import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core'; // Use inject to access services
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Inject AuthService here
  let token: string | null = null;

  // Access token from localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
  const storedData = localStorage.getItem('mediboard');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    token = parsedData.token || null;
    }
    }

  // Check token expiration
  if (token) {
    const expiration = JSON.parse(atob(token.split('.')[1])).exp * 1000; // Extract expiry time
    const now = new Date().getTime();
    if (now > expiration) {
      authService.logoutAuth(true); 
      localStorage.removeItem('mediboard'); 
      return throwError(() => new Error('Token expired')); 
    }

    // Clone request and set the Authorization header
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
