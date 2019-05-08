import {TestBed} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthHttpInterceptor, DataService} from '../services/httpInterceptor';

describe(`AuthHttpInterceptor`, () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${service.ROOT_URL}/posts`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);

    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'token YOUR-TOKEN-HERE',
    );
  });
});
