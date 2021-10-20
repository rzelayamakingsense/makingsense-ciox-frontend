import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable()
export class OktaMockInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (environment.mock && request.method === 'GET') {
      request = request.clone({ headers: request.headers.set('Prefer', 'code=200, dynamic=true') })
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => { return event })
    );
  }
}
