import { TemplateIndexSignature } from '@spryker-ui/utils';

export type TransformedSize = 'large' | 'default' | 'small';
export type TransformedVariant = 'default' | 'danger';

export interface Props {
    type: 'button' | 'submit';
    shape: 'default' | 'round' | 'circle';
    size: 'lg' | 'md' | 'sm' | TransformedSize;
    variant: 'primary' | 'secondary' | 'critical' | TransformedVariant;
    disabled: boolean;
}

export interface PropsTemplate extends TemplateIndexSignature {
    size: {
        lg: 'large';
        md: 'default';
        sm: 'small';
    };
    variant: {
        secondary: 'default';
        critical: 'danger';
    };
}
