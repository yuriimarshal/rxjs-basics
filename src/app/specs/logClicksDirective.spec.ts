import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {Component, Output, EventEmitter} from '@angular/core';
import {LogClicksDirective} from '../directives/logClicksDirective';

/*
  Usage:     <div log-clicks></div>
  For each click increments the public property `counter`.
*/
@Component({
  selector: 'app-container',
  template: `
    <div appLogClicks (changes)="changed($event)"></div>
  `
})
export class ContainerComponent {
  @Output() changes = new EventEmitter();

  constructor() {
  }

  changed(value) {
    this.changes.emit(value);
  }
}

describe('Directive: logClicks', () => {
  let fixture;
  let container;
  let element;

  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, LogClicksDirective]
    });

    fixture = TestBed.createComponent(ContainerComponent);
    container = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  // specs
  it('should increment counter (async)', async(() => {
    const div = element.querySelector('div');
    // set up subscriber
    container.changes.subscribe(x => {
      expect(x).toBe(1);
    });
    // trigger click on container
    div.click();
  }));

  it('should increment counter (fakeAsync/tick)', fakeAsync(() => {
    const div = element.querySelector('div');
    // set up subscriber
    container.changes.subscribe(x => {
      expect(x).toBe(1);
    });
    // trigger click on container
    div.click();
    // execute all pending asynchronous calls
    tick();
  }));

  it('should increment counter (done)', done => {
    const div = element.querySelector('div');
    // set up subscriber
    container.changes.subscribe(x => {
      expect(x).toBe(1);
      done();
    });
    // trigger click on container
    div.click();
  });
});
