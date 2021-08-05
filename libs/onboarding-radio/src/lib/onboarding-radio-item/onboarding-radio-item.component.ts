import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-onboarding-radio-item',
  templateUrl: './onboarding-radio-item.component.html',
  styleUrls: ['./onboarding-radio-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingRadioItemComponent {
  @Input() value?: string | number;
  @Input() disabled = false;

  @ViewChild('contentTpl') content!: TemplateRef<void>;
}
