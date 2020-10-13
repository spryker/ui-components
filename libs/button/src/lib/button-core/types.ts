export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Critical = 'critical',
  Link = 'link',
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

export type ButtonAttributes = Record<string, string>;
