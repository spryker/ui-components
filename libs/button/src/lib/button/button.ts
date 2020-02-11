export type TransformedSize = 'large' | 'default' | 'small';
export type TransformedVariant = 'primary' | 'default' | 'danger';
export type TransformedShape = 'round' | 'circle' | null;

export interface Props {
  type: 'button' | 'submit';
  shape: 'round' | 'circle' | 'default';
  size: 'lg' | 'md' | 'sm';
  variant: 'primary' | 'secondary' | 'critical';
  disabled: boolean;
}
