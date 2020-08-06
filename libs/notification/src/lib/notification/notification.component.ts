import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IconRemoveModule } from '@spryker/icon/icons';
import { ApplyContextsDirective, ToBoolean } from '@spryker/utils';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

import { NotificationDataType } from '../types';

@Component({
  selector: 'spy-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-notification',
  },
  providers: [ApplyContextsDirective],
})
export class NotificationComponent implements OnInit {
  @Input() type: NotificationDataType = NotificationDataType.Info;
  @Input() @ToBoolean() closeable = false;
  @Input() @ToBoolean() floating = false;

  @Output() closed = new EventEmitter<void>();

  @ViewChild(NzAlertComponent) nzAlertComponent?: NzAlertComponent;

  removeIcon = IconRemoveModule.icon;
  isClosed = false;

  constructor(private applyContextsDirective: ApplyContextsDirective) {}

  ngOnInit(): void {
    this.applyContextsDirective.ngOnInit();
  }

  onCloseHandler(event: Event) {
    if (this.floating) {
      event.stopPropagation();
    }

    this.closed.emit();
  }

  close(): boolean {
    this.nzAlertComponent?.closeAlert();

    return this.closeable;
  }
}
