import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { OnboardingRadioItemInputs } from '../onboarding-radio-item-inputs';

@Component({
  selector: 'spy-onboarding-radio-item',
  templateUrl: './onboarding-radio-item.component.html',
  styleUrls: ['./onboarding-radio-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingRadioItemComponent
  extends OnboardingRadioItemInputs
  implements OnInit {
  constructor() {
    super();
  }
  @ViewChild('contentTpl') template!: TemplateRef<void>;

  ngOnInit(): void {}
}
