import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-output',
  template: `
    <h1>Hello {{name}}!</h1>
    <div>
      <h1>{{counter}}</h1>
      <button (click)="change(1)">+1</button>
      <button (click)="change(-1)">-1</button>
    </div>
  `,
  styleUrls: ['./input-output.component.scss']
})
export class InputOutputComponent {
  public counter: number;

  @Input() name;
  @Output() changes = new EventEmitter();

  constructor() {
    this.counter = 0;
  }

  change(increment) {
    this.counter += increment;
    // we use emit as next is marked as deprecated
    this.changes.emit(this.counter);
  }
}
