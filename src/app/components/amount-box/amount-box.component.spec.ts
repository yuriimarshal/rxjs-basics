// We import all the angular testing tools that we are going to use.
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// We import all the dependencies that this component has.
import {AmountBoxComponent} from './amount-box.component';
import {By} from 'protractor';

let instance: AmountBoxComponent;

/**
 * We use a “describe” to start our test block with the title matching the tested component name.
 */

describe('AmountBoxComponent', () => {
  let component: AmountBoxComponent;

  // We use an async before each. The purpose of the async is to let all the possible asynchronous code to finish before continuing.

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmountBoxComponent]
    }).compileComponents().then(() => {
      const fixture = TestBed.createComponent(AppComponent);
      instance = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AmountBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test Reset button
   */

  it('should have as text `Reset`', async(() => {
    expect(instance.text).toEqual('Reset');
  }));

  it('should set value `amount` to expected number', async(() => {
    instance.resetForm(0);
    expect(instance.amount).toEqual(jasmine.any(Number));
  }));

  it('should call the resetForm method', async(() => {
    const fixture = TestBed.createComponent(AmountBoxComponent);
    fixture.detectChanges();
    spyOn(instance, 'resetForm');
    const el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(instance.resetForm).toHaveBeenCalledTimes(0);
  }));
});
