import {
  Component,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { IconRadioModule } from '@spryker/icon/icons';
import { BehaviorSubject } from 'rxjs';

import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';

@Component({
  selector: 'spy-onboarding-radio',
  templateUrl: './onboarding-radio.component.html',
  styleUrls: ['./onboarding-radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingRadioComponent {
  @Input() value?: string | number;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();

  radioIcon = IconRadioModule.icon;
  radios$ = new BehaviorSubject<OnboardingRadioItemComponent[]>([]);
  radioReference = OnboardingRadioItemComponent;

  @ContentChildren(OnboardingRadioItemComponent)
  set radios(radio: QueryList<OnboardingRadioItemComponent>) {
    this.radios$.next(radio.toArray());
  }

  radiosFound(radios: OnboardingRadioItemComponent[]): void {
    this.radios$.next(radios);
  }
}
