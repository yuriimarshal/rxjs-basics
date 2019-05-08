import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  catchError,
  publishReplay,
  refCount,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-amount-box',
  templateUrl: './amount-box.component.html',
  styleUrls: ['./amount-box.component.scss']
})
export class AmountBoxComponent implements OnInit, OnChanges, OnDestroy {
  private constURL = 'https://golden-domain';
  private headerOptions = HttpHeaders;

  @Input() public amount: number;
  public amount$ = new Subject();

  @Output() public changeAmount = new EventEmitter();

  public onReset$ = new Subject();

  currentUser$ = new Subject();
  unsubscribe$ = new Subject();

  // RULE 1. As soon as I get data X, I want to load data Y (which relates X)
  // RULE 2. If there still is an open Y-request (related to a previous X), I want to cancel that one
  // RULE 3. Publish the source stream as a ReplaySubject, followed by the refCount-operator,
  // handles (un-)subscribing as long as there’s at least one listener
  public bookmarks$ = this.currentUser$.pipe(
    switchMap(user => this.getBookmarks(user)),
    publishReplay(1),
    refCount(),
  );

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.onReset$.subscribe((val) => {
      this.resetForm(val);
    });
    this.amount$.subscribe((currentValue) => {
      this.amount = Number(currentValue);
    });
    this.bookmarks$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(bookmarks => {
        console.log(bookmarks);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // The `!== undefined` is only needed in case the new input value could be evaluated to `false`
    if (changes.amount && changes.amount.currentValue !== undefined) {
      this.amount$.next(changes.amount.currentValue);
    }
  }

  public ngOnDestroy() {
    // prevent memory leaks
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.amount$.unsubscribe();
    this.onReset$.unsubscribe();
  }

  public resetForm(val) {
    this.changeAmount.emit(0);
    this.amount$.next(val);
  }

  private getBookmarks(user) {
    // return this.http.get(this.constURL + `/users/${user.id}`)
    //   .pipe(catchError(this.handleError));
    return ['one', 'chance'];
  }

  handleError(error: Response) {
    if (error.status === 500) {
      this.router.navigate(['/login']);
    } else {
      return Observable.throw(error);
    }
  }

}
