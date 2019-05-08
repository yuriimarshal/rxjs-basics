import {TestBed, fakeAsync, tick, inject} from '@angular/core/testing';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppModule} from '../app.module';

@Component({
  selector: 'app-test',
  template: `
    <p></p>
  `
})
class TestComponent {
}

describe('Router tests', () => {
  let router;
  // setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    });
  });
  beforeEach(inject([Router], routerService => {
    router = routerService;
  }));

  it('default route redirects to home (fakeAsync/tick)', fakeAsync(() => {
    const fixture = TestBed.createComponent(TestComponent);
    router.initialNavigation(); // triggers default
    fixture.detectChanges();
    // execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/home')).toBe(true);
  }));
  it('can navigate to home (fakeAsync/tick)', fakeAsync(() => {
    const fixture = TestBed.createComponent(TestComponent);
    router.navigate(['/home']);
    fixture.detectChanges();
    // execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/home')).toBe(true);
  }));
  it('should redirect unexisting urls to Home (fakeAsync/tick)', fakeAsync(() => {
    const fixture = TestBed.createComponent(TestComponent);
    router.navigate(['/undefined/route']);
    fixture.detectChanges();
    // execute all pending asynchronous calls
    tick();
    expect(location.pathname.endsWith('/home')).toBe(true);
  }));
});
