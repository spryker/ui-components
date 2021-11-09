export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Critical = 'critical',
  Link = 'link',
  Outline = 'outline',
  CriticalOutline = 'critical-outline',
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
