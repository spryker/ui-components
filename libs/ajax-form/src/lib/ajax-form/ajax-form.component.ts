import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AjaxFormResponse } from '../types';

@Component({
  selector: 'spy-ajax-form',
  templateUrl: './ajax-form.component.html',
  styleUrls: ['./ajax-form.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'spy-ajax-form',
  },
})
export class AjaxFormComponent implements OnInit, OnDestroy {
  @Input() action?: string;
  @Input() method = 'GET';

  subscription?: Subscription;
  submitSubscription?: Subscription;
  ajaxFormResponse?: AjaxFormResponse;
  form?: string;
  isLoading = true;

  constructor(
    private ajaxActionService: AjaxActionService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (this.action) {
      this.subscription = this.http
        .get<AjaxFormResponse>(this.action)
        .subscribe({
          next: response => this.responseHandler(response),
          error: response => this.responseHandler(response),
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.submitSubscription?.unsubscribe();
  }

  submitHandler(form: HTMLFormElement, event: Event): void {
    event.preventDefault();

    const submitForm = new FormData(form);
    this.isLoading = true;

    if (this.action) {
      this.submitSubscription?.unsubscribe();
      this.submitSubscription = this.http
        .request<AjaxFormResponse>(this.method || 'GET', this.action, {
          body: submitForm,
        })
        .subscribe({
          next: response => this.responseHandler(response),
          error: response => this.responseHandler(response),
        });
    }
  }

  private responseHandler(response: AjaxFormResponse): void {
    this.ajaxFormResponse = response;

    if (response.form) {
      this.form = response.form;
      this.cdr.markForCheck();
    }

    this.isLoading = false;
    this.ajaxActionService.handle(response);
  }
}
