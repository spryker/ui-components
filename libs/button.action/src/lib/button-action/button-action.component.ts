import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Injector } from '@angular/core';
import { ActionConfig, ActionsService } from '@spryker/actions';
import { ButtonAttributes, ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '@spryker/button';

@Component({
  selector: 'spy-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonActionComponent {
  @Input() action?: ActionConfig;
  @Input() actionContext?: unknown;
  @Input() type?: ButtonType;
  @Input() variant?: ButtonVariant;
  @Input() shape?: ButtonShape;
  @Input() size?: ButtonSize;
  @Input() attrs?: ButtonAttributes;

  constructor(
    private injector: Injector,
    private actionsService: ActionsService,
  ) {}

  onClick(): void {
    this.actionsService.trigger(this.injector, this.action, this.actionContext);
  }
}
