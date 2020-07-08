import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DrawerRef } from '@spryker/drawer';
import { Observable, Subscription } from 'rxjs';
import { TableHtmlOverlayOptions, TableHtmlOverlayResponse } from './types';
import { HttpClient } from '@angular/common/http';
import { AjaxActionService } from '@spryker/ajax-action';

/**
 * Component is responsible for making HTTP request to fetch HTML and then render it within it’s view.
It also performs any side-effects from the response by using AjaxActionService API from @spryker/ajax-action.
 */
@Component({
  selector: 'spy-table-html-overlay-action-handler',
  templateUrl: './table-html-overlay-action-handler.component.html',
  styleUrls: ['./table-html-overlay-action-handler.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHtmlOverlayActionHandlerComponent implements OnInit {
  data$ = this.drawerRef.options.data;
  dataSubsctiption?: Subscription;
  requestSubscription?: Subscription;
  html?: string;
  isLoading = false;

  constructor(
    private drawerRef: DrawerRef<Observable<TableHtmlOverlayOptions>>,
    private injector: Injector,
    private http: HttpClient,
    private ajaxActionService: AjaxActionService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dataSubsctiption = this.data$?.subscribe({
      next: data => this.requestHandler(data),
    });
  }

  ngOnDestroy(): void {
    this.dataSubsctiption?.unsubscribe();
    this.requestSubscription?.unsubscribe();
  }

  /**
   * @param data: TableHtmlOverlayOptions
   * Sends the initial request to get the required html
   */
  private requestHandler(data: TableHtmlOverlayOptions): void {
    this.isLoading = true;

    this.requestSubscription = this.http
      .request<TableHtmlOverlayResponse>(data.method || 'GET', data.url, {})
      .subscribe({
        next: response => this.responseHandler(response),
        error: response => this.responseHandler(response),
      });
  }

  /**
   * @param response: TableHtmlOverlayResponse
   * Updates html and performs side-effects from the response by calling handle method of AjaxActionService
   */
  private responseHandler(response: TableHtmlOverlayResponse): void {
    if (response.html) {
      this.html = response.html;
    }

    this.isLoading = false;
    this.ajaxActionService.handle(response, this.injector);
    this.cdr.markForCheck();
  }
}
