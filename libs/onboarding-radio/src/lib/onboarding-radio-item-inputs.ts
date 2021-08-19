import { Input } from '@angular/core';

export class OnboardingRadioItemInputs {
  @Input() value!: string | number;
  @Input() disabled = false;
}
