import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  token: any;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    if (this.token) {
      req = req.clone({
        url: this.prepareUrl(req.url),
        setHeaders: {
          'Content-Type': 'application/json',
          'x-token': this.token,
        },
      });
    } else {
      req = req.clone({
        url: this.prepareUrl(req.url),
      });
    }
    return next.handle(req);
  }
  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }
  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : environment.apiUrl + url;
    return url;
  }
  public isAuthenticated() {
    return this.token != null;
  }
}
