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
import { BehaviorSubject } from 'rxjs';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { map, shareReplay } from 'rxjs/operators';
import { IconOnboardingCheckModule } from '@spryker/icon/icons';

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

  onboardingCheckIcon = IconOnboardingCheckModule.icon;

  radios$: BehaviorSubject<
    OnboardingRadioItemComponent[]
  > = new BehaviorSubject<OnboardingRadioItemComponent[]>([]);
  radiosCount$ = this.radios$.pipe(
    map((radios) => radios.length),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  radioItemReference = OnboardingRadioItemComponent;

  @ContentChildren(OnboardingRadioItemComponent)
  set contentRadios(radios: QueryList<OnboardingRadioItemComponent>) {
    this.radios$.next(radios.toArray());
  }

  public modelChange(value: string | number): void {
    this.valueChange.emit(value);
  }

  public radiosFound($event: OnboardingRadioItemComponent[]) {
    this.radios$.next($event);
  }
}
