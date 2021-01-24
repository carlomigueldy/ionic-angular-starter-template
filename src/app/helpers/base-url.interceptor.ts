import { Injectable, isDevMode } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as devEnvironment } from "@environments/environment";
import { environment as prodEnvironment } from "@environments/environment.prod";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (isDevMode()) {
      request = request.clone({
        url: devEnvironment.apiUrl + request.url,
      });
    } else {
      request = request.clone({
        url: prodEnvironment.apiUrl + request.url,
      });
    }

    return next.handle(request);
  }
}
