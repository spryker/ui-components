import { Observable } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { NotificationRef } from './notification-ref';

export interface NotificationConfig {
  timeOut?: number;
  position?: NotificationPosition;
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

export interface NotificationData extends NotificationConfig {
  type?: NotificationType;
  title: string | TemplateRef<NotificationContext>;
  description?: string | TemplateRef<NotificationContext>;
  closeable?: boolean;
}

export enum NotificationType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export enum NotificationPosition {
  TopLeft = 'topLeft',
  TopCenter = 'topCenter',
  TopRight = 'topRight',
  BottomLeft = 'bottomLeft',
  BottomCenter = 'bottomCenter',
  BottomRight = 'bottomRight',
  TopFullWidth = 'topFullWidth',
  BottomFullWidth = 'bottomFullWidth',
}

export enum NotificationEasing {
  Linear = 'linear',
  EaseIn = 'ease-in',
  EaseOut = 'ease-out',
  EaseInOut = 'ease-in-out',
}
