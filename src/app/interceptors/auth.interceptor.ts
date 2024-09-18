import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  
  let token: string | null = null;

  // Ensure localStorage is accessed only in the browser
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedData = localStorage.getItem('mediboard');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      token = parsedData.token || null;
      console.log(token, "token value"); // Logs the token if it exists
    }
  }

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // Ensure proper Bearer token format
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
