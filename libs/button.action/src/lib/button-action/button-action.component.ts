import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Injector,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { ActionConfig, ActionsService } from '@spryker/actions';
import {
  ButtonAttributes,
  ButtonShape,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@spryker/button';

@Component({
  selector: 'spy-button-action',
  templateUrl: './button-action.component.html',
  styleUrls: ['./button-action.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonActionComponent {
  @Input() @ToJson() action?: ActionConfig;
  @Input() @ToJson() actionContext?: unknown;
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
    if (!this.action) {
      return;
    }

    this.actionsService.trigger(
      this.injector,
      this.action,
      this.actionContext,
    );
  }
}
