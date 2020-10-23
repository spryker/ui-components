import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { IconModule } from '@spryker/icon';
import { IconRadioModule } from '@spryker/icon/icons';
import { I18nModule } from '@spryker/locale';
import { NumberToRomanStyleModule } from '@spryker/utils';
import { FormsModule } from '@angular/forms';

import { OnboardingRadioComponent } from './onboarding-radio/onboarding-radio.component';
import { OnboardingRadioItemComponent } from './onboarding-radio-item/onboarding-radio-item.component';
import { SelectComponentsModule } from '@spryker/web-components';

@NgModule({
  imports: [
    CommonModule,
    NzRadioModule,
    IconModule,
    IconRadioModule,
    I18nModule,
    NumberToRomanStyleModule,
    FormsModule,
    SelectComponentsModule
  ],
  declarations: [OnboardingRadioComponent, OnboardingRadioItemComponent],
  exports: [OnboardingRadioComponent, OnboardingRadioItemComponent],
})
export class OnboardingRadioModule {}
