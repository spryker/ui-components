import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { NotificationType } from './types';
import { ToBoolean } from '@spryker/utils';

@Directive({ standalone: false, selector: '[spyNotificationInputs]' })
export class NotificationInputs {
    @Input() type: NotificationType = NotificationType.Info;
    @Input() @ToBoolean() closeable = false;
    @Input() @ToBoolean() floating = true;
    @Output() closed = new EventEmitter<void>();
}
