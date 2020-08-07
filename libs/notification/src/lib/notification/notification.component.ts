import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { NotificationInputs } from '../notification-inputs';
import { NotificationRef } from '../notification-ref';
import { NotificationService } from '../notification.service';
import { NotificationConfig } from '../types';
import { ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification',
  },
})
export class NotificationComponent extends NotificationInputs
  implements OnInit, OnDestroy {
  @Input() title = '';
  @Input() description = '';
  @Input() @ToJson() floatingConfig?: NotificationConfig;

  private notificationRef?: NotificationRef;

  constructor(public notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    const floating = this.floating;
    const data = {
      ...this.floatingConfig,
      description: this.description,
      type: this.type,
      title: this.title,
      closeable: this.closeable,
    };

    if (floating) {
      this.notificationRef = this.notificationService.show(data);
    }
  }

  ngOnDestroy(): void {
    this.notificationRef?.close();
  }
}
