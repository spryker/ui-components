import {
  Component,
  ChangeDetectionStrategy,
  QueryList,
  AfterContentInit,
  ViewEncapsulation,
  ContentChildren,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { OnboardingRadioInputs } from '../onboarding-radio-inputs';
import { IconOnboardingRadioModule } from '@spryker/icon/icons';

@Component({
  selector: 'spy-onboarding-radio',
  templateUrl: './onboarding-radio.component.html',
  styleUrls: ['./onboarding-radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingRadioComponent
  extends OnboardingRadioInputs
  implements AfterContentInit {
  radios$: BehaviorSubject<
    OnboardingRadioItemComponent[]
  > = new BehaviorSubject<OnboardingRadioItemComponent[]>([]);
  onboardingRadioIcon = IconOnboardingRadioModule.icon;
  @ContentChildren(OnboardingRadioItemComponent) radioComponents!: QueryList<
    OnboardingRadioItemComponent
  >;
  radioItemComponent = OnboardingRadioItemComponent;

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    this.radios$.next(this.radioComponents.toArray());
  }

  storeComponents($event: OnboardingRadioItemComponent[]) {
    this.radios$.next($event);
    setTimeout(() => {}, 10000);
  }

  emitActiveRadio() {
    this.valueChange.emit(this.value);
  }

  checkRadiosExists() {
    let isExists;
    this.radios$.subscribe((radios) => {
      isExists = radios.length > 0;
    });
    return isExists;
  }
}
