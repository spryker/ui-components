import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { merge, of, Subject } from 'rxjs';
import {
  catchError,
  filter,
  mapTo,
  shareReplay,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { ButtonCoreInputs } from '../button-core/button-core';
import { ButtonComponent } from '../button/button.component';

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
export class ButtonAjaxComponent
  extends ButtonCoreInputs
  implements OnInit, OnDestroy
{
  @Input() method: ButtonAjaxMethod = ButtonAjaxMethod.Get;
  @Input() url?: string;

  @ViewChild(ButtonComponent) buttonComponent?: ButtonComponent;

  private click$ = new Subject<void>();
  private request$ = this.click$.pipe(
    filter(() => Boolean(this.url)),
    switchMap(() =>
      this.http
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .request(this.method, this.url!)
        .pipe(catchError((response) => of(response))),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  private destroyed$ = new Subject<void>();

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
      .subscribe((response) =>
        this.ajaxActionService.handle(response, this.injector),
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  click(): void {
    this.buttonComponent?.click();
  }

  handleClick() {
    this.click$.next();
  }
}
