import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'spy-notification-wrapper',
  templateUrl: './notification-wrapper.component.html',
  styleUrls: ['./notification-wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification-wrapper',
  },
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        }),
      ),
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        }),
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
      ),

      transition(
        'inactive => active',
        animate('{{ easeTime }}ms {{ easing }}'),
      ),

      transition('active => void', animate('{{ easeTime }}ms {{ easing }}')),
    ]),
  ],
})
export class NotificationWrapperComponent extends Toast {
  @HostBinding('@flyInOut')
  state = {
    value: 'inactive',
    params: {
      easeTime: this.toastPackage.config.easeTime,
      easing: this.toastPackage.config.easing,
    },
  };

  constructor(
    public toastPackage: ToastPackage,
    protected toastrService: ToastrService,
  ) {
    super(toastrService, toastPackage);
  }

  closeHandler(): void {
    this.toastrService.remove(this.toastPackage.toastId);
  }
}
