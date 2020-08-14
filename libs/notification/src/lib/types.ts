import { Observable } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { NotificationRef } from './notification-ref';

export interface NotificationConfig {
  timeOut?: number;
  position?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'topFullWidth'
    | 'bottomFullWidth';
  easing?: string;
  easeTime?: number;
  disableTimeOut?: boolean;
}

export interface NotificationGlobalConfig extends NotificationConfig {
  maxOpened?: number;
  newestOnTop?: boolean;
}

export interface NotificationContext {
  $implicit: NotificationRef;
}

export enum NotificationType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface NotificationData extends NotificationConfig {
  type?: NotificationType;
  title: string | TemplateRef<NotificationContext>;
  description?: string | TemplateRef<NotificationContext>;
  closeable?: boolean;
}
