import {inject, TestBed} from '@angular/core/testing';
import {CapitalisePipe} from '../pipes/capitalisePipe';

describe('Pipe: CapitalisePipe', () => {
  let pipe;

  // setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CapitalisePipe]
  }));

  beforeEach(inject([CapitalisePipe], p => {
    pipe = p;
  }));

  // specs
  it('should work with empty string', () => {
    expect(pipe.transform('')).toEqual('');
    // fail('something went wrong')
  });

  it('should capitalise', () => {
    expect(pipe.transform('wow')).toEqual('WOW');
    // pending('add more expectations')
  });

  it('should throw with invalid values', () => {
    // must use arrow function for expect to capture exception
    expect(() => pipe.transform(undefined)).toThrow();
    expect(() => pipe.transform()).toThrow();
    expect(() => pipe.transform()).toThrowError('Requires a String as input');
  });
});
