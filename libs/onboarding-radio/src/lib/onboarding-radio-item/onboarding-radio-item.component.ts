import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-onboarding-radio-item',
  templateUrl: './onboarding-radio-item.component.html',
  styleUrls: ['./onboarding-radio-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingRadioItemComponent {
  @ViewChild('contentTpl') template!: TemplateRef<void>;
  @Input() value?: string | number;
  @Input() @ToBoolean() disabled = false;
}
