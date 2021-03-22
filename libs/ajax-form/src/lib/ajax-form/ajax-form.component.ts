import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  Injector,
  ViewChild,
  OnInit,
} from '@angular/core';
import { DataSerializerService } from '@spryker/data-serializer';
import { AjaxActionService } from '@spryker/ajax-action';
import { Subscription } from 'rxjs';
import { UnsavedChangesFormMonitorDirective } from '@spryker/unsaved-changes.monitor.form';
import { AjaxFormRequestToken } from './tokens';

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
export class AjaxFormComponent implements OnDestroy, OnChanges, OnInit {
  @ViewChild(UnsavedChangesFormMonitorDirective, { static: true })
  unsavedChangesFormMonitorDirective?: UnsavedChangesFormMonitorDirective;

  @Input() action?: string;
  @Input() method = 'POST';

  subscription?: Subscription;
  submitSubscription?: Subscription;
  ajaxFormResponse?: AjaxFormResponse;
  isLoading = false;
  form?: string;
  formAction?: string;
  formMethod?: string;

  private ajaxFormComponentInjector?: Injector;

  constructor(
    private ajaxActionService: AjaxActionService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    private dataSerializerService: DataSerializerService,
  ) {}

  ngOnInit(): void {
    this.ajaxFormComponentInjector = Injector.create({
      name: 'AjaxFormComponent_Injector',
      providers: [
        {
          provide: UnsavedChangesFormMonitorDirective,
          useValue: this.unsavedChangesFormMonitorDirective,
        },
      ],
      parent: this.injector,
    });
  }

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
        .get<AjaxFormResponse>(this.formAction ?? this.action)
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

  submitHandler(form: HTMLFormElement, event: Event): void {
    event.preventDefault();

    const submitForm = new FormData(form);
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

    if (response.action) {
      this.formAction = response.action;
    }

    if (response.method) {
      this.formMethod = response.method;
    }

    this.isLoading = false;
    this.ajaxActionService.handle(response, this.ajaxFormComponentInjector);
    // TODO: investigate ExpressionChangedAfterItHasBeenCheckedError
    this.cdr.markForCheck();
  }
}
