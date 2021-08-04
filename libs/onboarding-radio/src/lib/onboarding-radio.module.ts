import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRadioComponent } from './onboarding-radio/onboarding-radio.component';
import { OnboardingRadioItemComponent } from './onboarding-radio-item/onboarding-radio-item.component';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzRadioModule,
  ],
  declarations: [
    OnboardingRadioComponent,
    OnboardingRadioItemComponent
  ],
  exports: [
    OnboardingRadioComponent,
    OnboardingRadioItemComponent
  ],
})
export class OnboardingRadioModule {}
