import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { applyContexts } from '@spryker/utils';

@Component({
  selector: 'spy-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent {
  @Input() type: 'info' | 'error' | 'warning' | 'success' = 'info';
  @Input() closeable = false;

  @Output() closed = new EventEmitter<void>();

  constructor(elemRef: ElementRef) {
    applyContexts(elemRef.nativeElement);
  }

  close(): boolean {
    this.closed.emit();

    return this.closeable;
  }
}
