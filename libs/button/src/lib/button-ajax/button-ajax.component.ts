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
import { ButtonCoreInputs } from '../button-core-inputs/button-core-inputs';
import { AjaxFormResponse } from '@spryker/ajax-form';
import { merge, of, Subject } from 'rxjs';
import {
  catchError,
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
  @Input() url = '';

  click$ = new Subject<void>();
  request$ = this.click$.pipe(
    switchMap(() =>
      this.http
        .request(String(this.method), String(this.url))
        .pipe(catchError(response => of(response))),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  destroyed$ = new Subject<void>();

  isLoading$ = merge(
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
      .subscribe(response => this.responseHandler(response));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  click(): void {
    this.click$.next();
  }

  private responseHandler(response: AjaxFormResponse): void {
    this.ajaxActionService.handle(response, this.injector);
  }
}
