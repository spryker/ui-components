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

export enum NotificationType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface NotificationData extends NotificationConfig {
  type?: NotificationType;
  title: string;
  description?: string;
  closeable?: boolean;
}
