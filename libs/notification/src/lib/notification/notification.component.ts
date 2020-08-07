import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';

import { NotificationInputs } from '../notification-inputs';
import { NotificationRef } from '../notification-ref';
import { NotificationViewComponent } from '../notification-view/notification-view.component';
import { NotificationService } from '../notification.service';
import { NotificationConfig } from '../types';

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

  @ViewChild(NotificationViewComponent)
  notificationViewComponent?: NotificationViewComponent;

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

  close(): boolean {
    this.notificationRef?.close();
    this.notificationViewComponent?.close();

    return this.closeable;
  }
}
