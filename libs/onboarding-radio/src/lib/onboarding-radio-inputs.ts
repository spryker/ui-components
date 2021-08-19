import { EventEmitter, Input, Output } from '@angular/core';

export class OnboardingRadioInputs {
  @Input() value: string | number = '';
  @Output() valueChange: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
}
