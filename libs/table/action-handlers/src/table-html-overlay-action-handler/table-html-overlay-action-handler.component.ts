import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { DrawerRef } from '@spryker/drawer';
import { Observable, Subscription, of, merge, empty, EMPTY } from 'rxjs';
import { TableHtmlOverlayOptions, TableHtmlOverlayResponse } from './types';
import { HttpClient } from '@angular/common/http';
import { AjaxActionService } from '@spryker/ajax-action';
import {
  catchError,
  map,
  tap,
  switchMap,
  mapTo,
  shareReplay,
} from 'rxjs/operators';

/**
 * Component is responsible for making HTTP request to fetch HTML and then render it within it’s view.
 * It also performs any side-effects from the response by using {@link AjaxActionService} API from `@spryker/ajax-action`.
 */
@Component({
  selector: 'spy-table-html-overlay-action-handler',
  templateUrl: './table-html-overlay-action-handler.component.html',
  styleUrls: ['./table-html-overlay-action-handler.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-table-html-overlay-action-handler',
  },
})
export class TableHtmlOverlayActionHandlerComponent {
  data$ = this.drawerRef.options.data || EMPTY;

  request$ = this.data$?.pipe(
    switchMap(data =>
      this.http
        .request<TableHtmlOverlayResponse>(data.method || 'GET', data.url, {})
        .pipe(catchError(response => of(response))),
    ),
    tap(response => this.ajaxActionService.handle(response, this.injector)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  html$ = this.request$?.pipe(map(response => response.html));

  isLoading$ = merge(
    this.data$.pipe(mapTo(true)),
    this.request$.pipe(mapTo(false)),
  );

  constructor(
    private drawerRef: DrawerRef<Observable<TableHtmlOverlayOptions>>,
    private injector: Injector,
    private http: HttpClient,
    private ajaxActionService: AjaxActionService,
    private cdr: ChangeDetectorRef,
  ) {}
}
