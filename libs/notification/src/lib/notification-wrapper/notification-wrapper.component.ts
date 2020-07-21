import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'spy-notification-wrapper',
  templateUrl: './notification-wrapper.component.html',
  styleUrls: ['./notification-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification-wrapper',
  },
})
export class NotificationWrapperComponent {
  constructor(
    private toastPackage: ToastPackage,
    private toastrService: ToastrService,
  ) {}

  closeHandler(): void {
    this.toastrService.remove(this.toastPackage.toastId);
  }
}
