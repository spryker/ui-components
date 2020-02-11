import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TemplateIndexSignature, propsTransformation } from '@spryker-ui/utils';

export interface Props {
  type: 'button' | 'submit';
  shape: 'round' | 'circle' | 'default';
  size: 'lg' | 'md' | 'sm';
  variant: 'primary' | 'secondary' | 'critical';
  disabled: boolean;
}

const propsTemplate = {
  size: {
    lg: 'large',
    md: 'default',
    sm: 'small',
  },
  variant: {
    secondary: 'default',
    critical: 'danger',
  },
  shape: {
    default: 'null',
  },
} as const;

@Component({
  selector: 'spy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() type: Props['type'] = 'button';
  @Input() shape: Props['shape'] = 'default';
  @Input() size: Props['size'] = 'md';
  @Input() disabled: Props['disabled'] = false;
  @Input() variant: Props['variant'] = 'primary';

  sizeInner = propsTransformation(propsTemplate, this.size, 'size');
  variantInner = propsTransformation(propsTemplate, this.variant, 'variant');
  shapeInner = propsTransformation(propsTemplate, this.shape, 'shape');

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      this.sizeInner = propsTransformation(propsTemplate, this.size, 'size');
    }

    if ('variant' in changes) {
      this.variantInner = propsTransformation(
        propsTemplate,
        this.variant,
        'variant',
      );
    }

    if ('shape' in changes) {
      this.shapeInner = propsTransformation(propsTemplate, this.shape, 'shape');
    }
  }
}
