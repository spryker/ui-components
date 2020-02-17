import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { propsTransformation } from '@spryker/utils';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() type: Props['type'] = 'button';
  @Input() shape: Props['shape'] = 'default';
  @Input() size: Props['size'] = 'md';
  @Input() disabled: Props['disabled'] = false;
  @Input() variant: Props['variant'] = 'primary';

  sizeInner = this.sizeTransformation();
  variantInner = this.variantTransformation();
  shapeInner = this.shapeTransformation();

  ngOnChanges(changes: SimpleChanges): void {
    if ('size' in changes) {
      this.sizeInner = this.sizeTransformation();
    }

    if ('variant' in changes) {
      this.variantInner = this.variantTransformation();
    }

    if ('shape' in changes) {
      this.shapeInner = this.shapeTransformation();
    }
  }

  sizeTransformation() {
    return propsTransformation(propsTemplate, this.size, 'size');
  }

  variantTransformation() {
    return propsTransformation(propsTemplate, this.variant, 'variant');
  }

  shapeTransformation() {
    return propsTransformation(propsTemplate, this.shape, 'shape');
  }
}
