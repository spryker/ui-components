import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  Injector,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AjaxActionService } from '@spryker/ajax-action';
import { ButtonCoreInputs } from '../button-core-inputs/button-core-inputs';
import { AjaxFormResponse } from '@spryker/ajax-form';

enum ButtonAjaxMethod {
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
export class ButtonAjaxComponent {
  isLoading: Boolean = false;

  constructor() // private ajaxActionService: AjaxActionService,
  // private http: HttpClient,
  // private injector: Injector,
  {}

  @Input() url: string = '';
  @Input() size: string = '';
  @Input() method: ButtonAjaxMethod = ButtonAjaxMethod.Get;

  private onClick(event: Event) {
    /*event.preventDefault();

    this.isLoading = true;

    this.http.request(this.method, this.url).subscribe({
      next: response => this.responseHandler(response),
      error: response => this.responseHandler(response),
    });*/
  }

  private responseHandler(response: AjaxFormResponse): void {
    /*this.isLoading = false;
    this.ajaxActionService.handle(response, this.injector);*/
  }
}
