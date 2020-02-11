import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { propsTransformation } from '@spryker-ui/utils';

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
export class ButtonComponent implements OnChanges, OnInit {
  @Input() type: Props['type'] = 'button';
  @Input() shape: Props['shape'] = 'default';
  @Input() size: Props['size'] = 'md';
  @Input() disabled: Props['disabled'] = false;
  @Input() variant: Props['variant'] = 'primary';

  sizeInner = '';
  variantInner = '';
  shapeInner: string | null = '';

  ngOnInit(): void {
    this.sizeTransformation();
    this.variantTransformation();
    this.shapeTransformation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('size' in changes) {
      this.sizeTransformation();
    }

    if ('variant' in changes) {
      this.variantTransformation();
    }

    if ('shape' in changes) {
      this.shapeInner = propsTransformation(propsTemplate, this.shape, 'shape');
    }
  }

  sizeTransformation(): void {
    this.sizeInner = propsTransformation(propsTemplate, this.size, 'size');
  }

  variantTransformation(): void {
    this.variantInner = propsTransformation(
      propsTemplate,
      this.variant,
      'variant',
    );
  }

  shapeTransformation(): void {
    this.shapeInner = propsTransformation(propsTemplate, this.shape, 'shape');
  }
}
