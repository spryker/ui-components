import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Injector,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AjaxActionService } from '@spryker/ajax-action';
import { ButtonCoreInputs } from '../button-core/button-core';
import { merge, of, Subject } from 'rxjs';
import {
  catchError,
  filter,
  mapTo,
  shareReplay,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

export enum ButtonAjaxMethod {
  Get = 'GET',
  Post = 'POST',
}

@Component({
  selector: 'spy-button-ajax',
  templateUrl: './button-ajax.component.html',
  styleUrls: ['./button-ajax.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonAjaxComponent extends ButtonCoreInputs
  implements OnInit, OnDestroy {
  @Input() method: ButtonAjaxMethod = ButtonAjaxMethod.Get;
  @Input() url?: string;

  private click$ = new Subject<void>();
  private request$ = this.click$.pipe(
    filter(() => Boolean(this.url)),
    switchMap(() =>
      this.http
        // tslint:disable-next-line: no-non-null-assertion
        .request(this.method, this.url!)
        .pipe(catchError(response => of(response))),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  private destroyed$ = new Subject<void>();

  private isLoading$ = merge(
    this.click$.pipe(mapTo(true)),
    this.request$.pipe(mapTo(false)),
  );

  constructor(
    private ajaxActionService: AjaxActionService,
    private http: HttpClient,
    private injector: Injector,
  ) {
    super();
  }

  ngOnInit(): void {
    this.request$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(response =>
        this.ajaxActionService.handle(response, this.injector),
      );
  }

  ngOnDestroy(): void {
    /** clearing stream to prevent memory leak */
    this.destroyed$.next();
  }

  click(): void {
    this.click$.next();
  }
}
