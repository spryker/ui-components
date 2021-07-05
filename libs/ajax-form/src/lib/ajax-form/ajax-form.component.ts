import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { DataSerializerService } from '@spryker/data-serializer';
import { HtmlRendererComponent } from '@spryker/html-renderer';
import { Subscription } from 'rxjs';

import { AjaxFormResponse } from '../types';
import { AjaxFormRequestToken } from './tokens';

export interface SubmitEvent extends Event {
  // See https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter
  // See https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-submitevent-submitter
  submitter: HTMLElement | null;
}

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
export class AjaxFormComponent implements OnDestroy, OnChanges {
  @ViewChild(HtmlRendererComponent, { read: Injector })
  htmlRendererInjector?: Injector;

  @Input() action?: string;
  @Input() method = 'POST';

  subscription?: Subscription;
  submitSubscription?: Subscription;
  ajaxFormResponse?: AjaxFormResponse;
  isLoading = false;
  form?: string;
  formAction?: string;
  formMethod?: string;

  constructor(
    private ajaxActionService: AjaxActionService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    private dataSerializerService: DataSerializerService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('action' in changes) {
      this.fetchForm();
    }
  }

  refreshForm(): void {
    this.fetchForm();
  }

  private fetchForm(): void {
    if (this.action) {
      this.isLoading = true;

      this.subscription = this.http
        .get<AjaxFormResponse>(this.action)
        .subscribe({
          next: (response) => this.responseHandler(response),
          error: (response) => this.responseHandler(response),
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.submitSubscription?.unsubscribe();
  }

  submitHandler(form: HTMLFormElement, event: SubmitEvent): void {
    event.preventDefault();

    const submitElem = event.submitter;
    const submitForm = new FormData(form);

    if (submitElem) {
      const submitName = submitElem.getAttribute('name');
      const submitValue = submitElem.getAttribute('value') ?? '';

      if (submitName) {
        submitForm.append(submitName, submitValue);
      }
    }

    this.isLoading = true;

    if (this.action) {
      this.submitSubscription?.unsubscribe();
      this.submitSubscription = this.http
        .request<AjaxFormResponse>(
          (this.formMethod ?? this.method) || 'POST',
          this.formAction ?? this.action,
          {
            body: this.dataSerializerService.serialize(
              AjaxFormRequestToken,
              submitForm,
            ),
          },
        )
        .subscribe({
          next: (response) => this.responseHandler(response),
          error: (response) => this.responseHandler(response),
        });
    }
  }

  private responseHandler(response: AjaxFormResponse): void {
    this.ajaxFormResponse = response;

    if (response.form) {
      this.form = response.form;
    }

    this.formAction = response.action;
    this.formMethod = response.method;

    this.isLoading = false;
    this.ajaxActionService.handle(
      response,
      this.htmlRendererInjector ?? this.injector,
    );
    // TODO: investigate ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.markForCheck();
  }
}
