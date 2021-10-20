import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable()
export class OktaAuthInterceptor implements HttpInterceptor {

  constructor(
    private oktaAuth: OktaAuth
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({ headers: request.headers.set("Accept", "application/json") });

    request = request.clone({ headers: request.headers.set("Authorization", `Bearer ${this.oktaAuth.getAccessToken()}` || "") });

    if (!request.headers.has("Content-Type")) {
      request = request.clone({ headers: request.headers.set("Content-Type", "application/json") });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }));

  }
}
