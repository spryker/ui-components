import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { RadioComponent } from '../radio/radio.component';

@Component({
  selector: 'spy-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-radio-group',
    '[class.spy-radio-group--selected]': 'value',
    '[class.spy-radio-group--error]': 'hasError',
  },
})
export class RadioGroupComponent implements OnInit, OnDestroy {
  @Input() value?: string;
  @Input() name?: string;

  @Output() selected = new EventEmitter<boolean>();

  hasError = false;

  addRadio$ = new BehaviorSubject(new Set<RadioComponent>());
  radios$ = this.addRadio$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
  private destroyed$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.radios$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (radios) =>
          (this.hasError = [...radios].some(({ hasError }) => hasError)),
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  select(option: string | RadioComponent): void {
    const radios = this.addRadio$.getValue();

    if (typeof option === 'string') {
      const isRealValue = [...radios].some(({ value }) => value === option);

      if (!isRealValue) {
        return;
      }

      this.value = option;

      return;
    }

    if (!radios.has(option)) {
      return;
    }

    this.value = option.value;
  }

  reset(): void {
    this.value = undefined;
    this.cdr.detectChanges();
  }
}
