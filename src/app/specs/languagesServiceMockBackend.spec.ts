import {inject, TestBed, async} from '@angular/core/testing';
import {HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {LanguagesService} from '../services/languagesService';

describe('MockBackend: LanguagesService', () => {
  let mockbackend;
  let service;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        LanguagesService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });

  beforeEach(inject([LanguagesService, XHRBackend], (newService, newMockbackend) => {
    service = newService;
    mockbackend = newMockbackend;
  }));

  // specs
  it('should return mocked response (async)', async(() => {
    const response = ['ru', 'es'];
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(response)
      })));
    });
    service.get().subscribe(languages => {
      expect(languages).toContain('ru');
      expect(languages).toContain('es');
      expect(languages.length).toBe(2);
    });
  }));

  // Note: can't use fakeAsync with XHR calls
  it('should return mocked response (done)', done => {
    const response = ['ru', 'es'];
    mockbackend.connections.subscribe(connection => {
      const bookResponse = JSON.parse(response.toString());
      connection.mockRespond(new Response(bookResponse));
    });
    service.get().subscribe(languages => {
      expect(languages).toContain('ru');
      expect(languages).toContain('es');
      expect(languages.length).toBe(2);
      done();
    });
  });
});
