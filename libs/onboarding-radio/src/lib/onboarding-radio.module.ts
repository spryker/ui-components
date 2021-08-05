import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRadioComponent } from './onboarding-radio/onboarding-radio.component';
import { OnboardingRadioItemComponent } from './onboarding-radio-item/onboarding-radio-item.component';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd';
import { SelectComponentsModule } from '@spryker/web-components';
import { IconModule } from '@spryker/icon';
import { IconOnboardingCheckModule } from '@spryker/icon/icons';
import { RomanModule } from '@spryker/utils';
import { I18nModule } from '@spryker/locale';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzRadioModule,
    SelectComponentsModule,
    IconModule,
    IconOnboardingCheckModule,
    RomanModule,
    I18nModule,
  ],
  declarations: [OnboardingRadioComponent, OnboardingRadioItemComponent],
  exports: [OnboardingRadioComponent, OnboardingRadioItemComponent],
})
export class OnboardingRadioModule {}
