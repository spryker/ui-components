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
}

export interface NotificationGlobalConfig extends NotificationConfig {
  maxOpened?: number;
  newestOnTop?: boolean;
}

export type NotificationDataType = 'info' | 'error' | 'warning' | 'success';

export interface NotificationData extends NotificationConfig {
  type?: NotificationDataType;
  title: string;
  description?: string;
  closeable?: boolean;
}
