import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OktaAuth } from '@okta/okta-auth-js';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable()
export class OktaAuthInterceptor implements HttpInterceptor {
  constructor(private oktaAuth: OktaAuth, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.mock && request.method === 'GET') {
      request = request.clone({ headers: request.headers.set('Prefer', 'code=200, dynamic=true') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.oktaAuth.getAccessToken()}` || ''),
    });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.oktaAuth.closeSession();
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
        }

        return throwError(error);
      }),
    );
  }
}
