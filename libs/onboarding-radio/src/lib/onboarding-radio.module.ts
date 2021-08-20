import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRadioComponent } from './onboarding-radio/onboarding-radio.component';
import { OnboardingRadioItemComponent } from './onboarding-radio-item/onboarding-radio-item.component';
import { IconModule } from '@spryker/icon';
import { IconOnboardingRadioModule } from '@spryker/icon/icons';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { SelectComponentsModule } from '@spryker/web-components';
import { FormsModule } from '@angular/forms';
import { ToRomanModule } from '@spryker/utils';

@NgModule({
  imports: [
    CommonModule,
    IconOnboardingRadioModule,
    IconModule,
    NzRadioModule,
    ToRomanModule,
    SelectComponentsModule,
    FormsModule,
  ],
  declarations: [OnboardingRadioComponent, OnboardingRadioItemComponent],
  exports: [OnboardingRadioComponent, OnboardingRadioItemComponent],
})
export class OnboardingRadioModule {}
