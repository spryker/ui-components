export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Critical = 'critical',
}

export enum ButtonShape {
  Default = 'default',
  Round = 'round',
  Circle = 'circle',
}

export enum ButtonSize {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export enum ButtonAjaxMethod {
  Get = 'GET',
  Post = 'POST',
}

export type ButtonAttributes = Record<string, string>;
