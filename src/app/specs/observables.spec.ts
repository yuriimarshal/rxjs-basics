import {async, fakeAsync, tick} from '@angular/core/testing';
import {Observable} from 'rxjs';

describe('Observable: basic observable', () => {
  let basic$;

  // setup
  beforeEach(() => {
    basic$ = new Observable(observer => {
      // pushing values
      observer.next(1);
      observer.next(2);
      observer.next(3);
      // complete stream
      observer.complete();
    });
  });

  // specs
  it('should create the expected sequence (async)', async(() => {
    const expected = [1, 2, 3];
    let index = 0;
    basic$
      .subscribe({
        next: x => expect(x).toEqual(expected[index++]),
        error: e => console.log(e)
      });
  }));

  it('should create the expected sequence (fakeAsync/tick)', fakeAsync(() => {
    const expected = [1, 2, 3];
    let index = 0;
    basic$
      .subscribe({
        next: x => expect(x).toEqual(expected[index++]),
        error: e => console.log(e)
      });
    // execute all pending asynchronous calls
    tick();
  }));

  it('should create the expected sequence (done)', done => {
    const expected = [1, 2, 3];
    let index = 0;
    basic$
      .subscribe({
        next: x => expect(x).toEqual(expected[index++]),
        error: e => console.log(e),
        complete: () => done()
      });
  });
});
