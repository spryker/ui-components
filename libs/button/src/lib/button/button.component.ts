import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  Props,
  TransformedSize,
  TransformedVariant,
  TransformedShape,
} from './button';
import { TemplateIndexSignature } from '@spryker-ui/utils';
import { propsTransformation } from '@spryker-ui/utils';

const propsTemplate: TemplateIndexSignature = {
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
};

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

  private isMouseDown: boolean = false;
  private sizeInner: TransformedSize = <TransformedSize>(
    propsTransformation(propsTemplate, this.size, 'size')
  );
  private variantInner: TransformedVariant = <TransformedVariant>(
    propsTransformation(propsTemplate, this.variant, 'variant')
  );
  private shapeInner: TransformedShape = <TransformedShape>(
    propsTransformation(propsTemplate, this.shape, 'shape')
  );

  ngOnChanges(changes: SimpleChanges) {
    if ('size' in changes) {
      this.sizeInner = <TransformedSize>(
        propsTransformation(propsTemplate, this.size, 'size')
      );
    }

    if ('variant' in changes) {
      this.variantInner = <TransformedVariant>(
        propsTransformation(propsTemplate, this.variant, 'variant')
      );
    }

    if ('shape' in changes) {
      this.shapeInner = <TransformedShape>(
        propsTransformation(propsTemplate, this.shape, 'shape')
      );
    }
  }

  private mouseDownHandler(event: MouseEvent): void {
    const isLeftMouseClick = event.buttons === 1;

    if (!isLeftMouseClick) {
      return;
    }

    event.preventDefault();
    this.isMouseDown = true;
  }

  private mouseLeaveHandler(): void {
    this.isMouseDown = false;
  }
}
