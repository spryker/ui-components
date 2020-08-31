import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { IconOnboardingModule } from '@spryker/icon/icons';
import { ToJson } from '@spryker/utils';
import { BehaviorSubject } from 'rxjs';

import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';

@Component({
  selector: 'spy-onboarding-radio',
  templateUrl: './onboarding-radio.component.html',
  styleUrls: ['./onboarding-radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-onboarding-radio',
  },
})
export class OnboardingRadioComponent {
  @Input() @ToJson() value?: string | number;

  @Output() valueChange = new EventEmitter<string | number>();

  radios$ = new BehaviorSubject<OnboardingRadioItemComponent[]>([]);

  @ContentChildren(OnboardingRadioItemComponent)
  set contentRadios(childrenRadios: QueryList<OnboardingRadioItemComponent>) {
    this.radios$.next(childrenRadios.toArray());
  }

  radioReference = OnboardingRadioItemComponent;
  onboardingIcon = IconOnboardingModule.icon;

  radiosFound(radios: OnboardingRadioItemComponent[]): void {
    this.radios$.next(radios);
  }
}
