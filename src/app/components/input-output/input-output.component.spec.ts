import {By} from '@angular/platform-browser';
import {InputOutputComponent} from './input-output.component';
import {async, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

describe('Component: InputOutputComponent', () => {
  let fixture;
  let greeter;
  let element;
  let de;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOutputComponent ]
    });

    fixture = TestBed.createComponent(InputOutputComponent);
    greeter = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });

  // specs
  it('should render `Hello World!` (async)', async(() => {
    greeter.name = 'World';
    // trigger change detection
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.querySelector('h1').innerText).toBe('Hello World!');
      expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Hello World!');
    });
  }));

  it('should render `Hello World!` (fakeAsync/tick)', fakeAsync(() => {
    greeter.name = 'World';
    // trigger change detection
    fixture.detectChanges();
    // execute all pending asynchronous calls
    tick();
    expect(element.querySelector('h1').innerText).toBe('Hello World!');
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Hello World!');
  }));

  it('should render `Hello World!` (done)', done => {
    greeter.name = 'World';
    // trigger change detection
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(element.querySelector('h1').innerText).toBe('Hello World!');
      expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Hello World!');
      done();
    });
  });

  let counter;

  // setup
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ InputOutputComponent ]
  }));

  beforeEach(inject([InputOutputComponent], c => {
    counter = c;
  }));

  // specs
  it('should increment +1 (async)', async(() => {
    counter.changes.subscribe(x => {
      expect(x).toBe(1);
    });
    counter.change(1);
  }));

  it('should decrement -1 (async)', async(() => {
    counter.changes.subscribe(x => {
      expect(x).toBe(-1);
    });
    counter.change(-1);
  }));

  it('should increment +1 (fakeAsync/tick)', fakeAsync(() => {
    counter.changes.subscribe(x => {
      expect(x).toBe(1);
    });
    counter.change(1);
    // execute all pending asynchronous calls
    tick();
  }));

  it('should decrement -1 (fakeAsync/tick)', fakeAsync(() => {
    counter.changes.subscribe(x => {
      expect(x).toBe(-1);
    });
    counter.change(-1);
    // execute all pending asynchronous calls
    tick();
  }));

  it('should increment +1 (done)', done => {
    counter.changes.subscribe(x => {
      expect(x).toBe(1);
      done();
    });
    counter.change(1);
  });

  it('should decrement -1 (done)', done => {
    counter.changes.subscribe(x => {
      expect(x).toBe(-1);
      done();
    });
    counter.change(-1);
  });
});
