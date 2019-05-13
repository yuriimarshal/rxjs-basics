import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Post {
  header: string;
}

@Injectable()
export class DataService {
  ROOT_URL = `http://jsonplaceholder.typicode.com`;

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>(`${this.ROOT_URL}/posts`);
  }
}

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'token YOUR-TOKEN-HERE'),
    });
    return next.handle(newRequest);
  }
}
