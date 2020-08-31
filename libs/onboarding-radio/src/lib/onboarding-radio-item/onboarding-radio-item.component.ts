import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-onboarding-radio-item',
  templateUrl: './onboarding-radio-item.component.html',
  styleUrls: ['./onboarding-radio-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingRadioItemComponent {
  @ViewChild('contentTpl') template!: TemplateRef<void>;

  @Input() @ToJson() value?: string | number;
  @Input() @ToBoolean() disabled?: boolean;
}
