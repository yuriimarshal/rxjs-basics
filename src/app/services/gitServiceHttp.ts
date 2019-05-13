import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/throw';

export interface User {
  login: string;
}

export interface SearchResults<T> {
  items: T[];
}

@Injectable()
export class GithubApiService {
  readonly BASE_URL = 'https://api.github.com';
  readonly CATEGORIES = ['repositories', 'commits', 'code', 'issues', 'users'];

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  search<T>(what: string, params: HttpParams): Observable<SearchResults<T>> {
    if (this.CATEGORIES.indexOf(what) === -1) {
      return Observable.throw(`Searching for ${what} is not supported. The available types are: ${this.CATEGORIES.join(', ')}.`);
    }
    return this.http.get<SearchResults<T>>(`${this.BASE_URL}/search/${what}`, {params});
  }

}
