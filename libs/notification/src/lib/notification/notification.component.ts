import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IconRemoveModule } from '@spryker/icon/icons';
import { applyContexts, ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent {
  @Input() type: 'info' | 'error' | 'warning' | 'success' = 'info';
  @Input() @ToBoolean() closeable = false;

  @Output() closed = new EventEmitter<void>();

  removeIcon = IconRemoveModule.icon;

  constructor(elemRef: ElementRef) {
    applyContexts(elemRef.nativeElement);
  }

  close(): boolean {
    this.closed.emit();

    return this.closeable;
  }
}
