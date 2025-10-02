import { Directive, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { NotificationType } from './types';

@Directive({ standalone: false, selector: '[spyNotificationInputs]' })
export class NotificationInputs {
    @Input() type: NotificationType = NotificationType.Info;
    @Input({ transform: booleanAttribute }) closeable = false;
    @Input({ transform: booleanAttribute }) floating = true;
    @Output() closed = new EventEmitter<void>();
}
