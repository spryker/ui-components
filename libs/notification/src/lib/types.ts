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

export interface NotificationData extends NotificationConfig {
  type?: 'info' | 'error' | 'warning' | 'success';
  title: string;
  description?: string;
  closeable?: boolean;
}
