import {
  Component,
  ChangeDetectionStrategy,
  QueryList,
  ViewEncapsulation,
  ContentChildren, Input, Output, EventEmitter,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { IconOnboardingRadioModule } from '@spryker/icon/icons';

@Component({
  selector: 'spy-onboarding-radio',
  templateUrl: './onboarding-radio.component.html',
  styleUrls: ['./onboarding-radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingRadioComponent {

  @Input() value?: string | number;
  @Output() valueChange = new EventEmitter<string | number>();

  @ContentChildren(OnboardingRadioItemComponent)
  set onboardingRadioItems(
    onboardingRadioItems: QueryList<OnboardingRadioItemComponent>,
  ) {
    this.radios$.next(onboardingRadioItems.toArray());
  }

  radios$ = new BehaviorSubject<OnboardingRadioItemComponent[]>([]);
  onboardingRadioIcon = IconOnboardingRadioModule.icon;
  radioItemComponent = OnboardingRadioItemComponent;

  storeComponents($event: OnboardingRadioItemComponent[]): void {
    this.radios$.next($event);
  }

  emitActiveRadio(): void {
    this.valueChange.emit(this.value);
  }

}
