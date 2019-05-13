import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {selectConfig} from './store/selectors/config.selector';
import {select, Store} from '@ngrx/store';
import {IAppState} from './store/state/app.state';
import {GetConfig} from './store/actions/config.actions';

export class User {
  constructor(public email: string,
              public password: string) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-jasmine tutor';
  childAmount = 333;

  config$ = this._store.pipe(select(selectConfig));

  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private _store: Store<IAppState>) {
  }

  ngOnInit() {
    this._store.dispatch(new GetConfig());
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]],
    });
  }

  login() {
    console.log(`Login ${this.form.value}`);
    if (this.form.valid) {
      this.loggedIn.emit(
        new User(
          this.form.value.email,
          this.form.value.password
        )
      );
    }
  }

  changeAmount(val) {
    this.childAmount = val;
  }
}
