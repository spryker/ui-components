import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'spy-onboarding-radio',
  templateUrl: './onboarding-radio.component.html',
  styleUrls: ['./onboarding-radio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingRadioComponent implements OnInit {

  @Input() value?: string | number;
  @Output() valueChange = new EventEmitter<string | number>();

  radios$: BehaviorSubject<OnboardingRadioItemComponent[]> = new BehaviorSubject<OnboardingRadioItemComponent[]>([]);
  selectedRadioComponent$: BehaviorSubject<OnboardingRadioItemComponent | null> = new BehaviorSubject<OnboardingRadioItemComponent | null>(null);

  radiosCount$ = this.radios$.pipe(shareReplay(1));


  @ContentChildren(OnboardingRadioItemComponent)
  set contentRadios(radios: QueryList<OnboardingRadioItemComponent>) {
    this.radios$.next(radios.toArray());
  }

  constructor() { }

  ngOnInit(): void {
  }

  public modelChange(value: string | number): void {
    this.valueChange.emit(value);
    this.selectedRadioComponent$.next(this.radios$.value.find(component => component.value === value) ?? null);
  }

}
