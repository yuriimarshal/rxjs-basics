import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, ErrorObserver} from 'rxjs';

@Injectable()
export class LanguagesServiceHttp {
  private options = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  };

  constructor(private httpClient: HttpClient) {
  }

  get(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get('./languages.json', {...this.options, params})
      .catch(error => ErrorObserver.create(error.error));
  }
}
