import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { AjaxActionResponse, AjaxActionService } from '@spryker/ajax-action';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

interface AjaxFormResponse extends AjaxActionResponse {
  form?: string;
}

@Component({
  selector: 'spy-ajax-form',
  templateUrl: './ajax-form.component.html',
  styleUrls: ['./ajax-form.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AjaxActionService],
})
export class AjaxFormComponent implements OnInit, OnDestroy {
  @Input() action?: string;
  @Input() method = 'GET';

  subscription = new Subscription();
  submitSubscription = new Subscription();
  ajaxFormResponse?: AjaxFormResponse;
  form?: string;

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
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.submitSubscription.unsubscribe();
  }

  submitHandler(form: HTMLFormElement): void {
    const submitForm = new FormData(form);

    if (this.action) {
      this.submitSubscription = this.http
        .request<AjaxFormResponse>(this.method, this.action, {
          body: submitForm,
        })
        .subscribe({
          next: response => this.responseHandler(response),
        });
    }
  }

  private responseHandler(response: AjaxFormResponse): void {
    this.ajaxFormResponse = response;

    if (response.form) {
      this.form = response.form;
      this.cdr.markForCheck();
    }

    this.ajaxActionService.handle(response);
  }
}
