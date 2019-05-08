import {TestBed, getTestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GithubApiService} from '../services/gitServiceHttp';
import {HttpParams} from '@angular/common/http';

describe('GithubApiService', () => {
  let injector: TestBed;
  let service: GithubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });
    injector = getTestBed();
    service = injector.get(GithubApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers = [
        {login: 'John'},
        {login: 'Doe'}
      ];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${service.BASE_URL}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });

  describe('#search', () => {
    const dummyParams = new HttpParams().set('q', 'cironunes');

    it('should throw an error if trying to search for not supported `category`', () => {
      service.search('unknown', dummyParams)
        .subscribe(() => {
        }, err => {
          expect(err).toBe(`Searching for unknown is not supported. The available types are: ${service.CATEGORIES.join(', ')}.`);
        });

      httpMock.expectNone(`${service.BASE_URL}/search/users?q=cironunes`);
    });

    it('should return an Observable<SearchResults>', () => {
      service.search('users', dummyParams)
        .subscribe(result => {
          expect(result.items.length).toBe(2);
        });

      const req = httpMock.expectOne(`${service.BASE_URL}/search/users?q=cironunes`);
      expect(req.request.url).toBe(`${service.BASE_URL}/search/users`);
      expect(req.request.params).toEqual(dummyParams);

      req.flush({
        incomplete_results: false,
        items: [{}, {}],
        total_count: 2
      });
    });
  });
});
