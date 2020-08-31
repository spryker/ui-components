import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRadioComponent } from './onboarding-radio/onboarding-radio.component';
import { OnboardingRadioItemComponent } from './onboarding-radio-item/onboarding-radio-item.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '@spryker/locale';
import { IconOnboardingModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';
import { SelectComponentsModule } from '@spryker/web-components';
import { NumberTransformModule } from '@spryker/utils';

@NgModule({
  imports: [
    CommonModule,
    NzRadioModule,
    FormsModule,
    I18nModule,
    IconModule,
    IconOnboardingModule,
    SelectComponentsModule,
    NumberTransformModule,
  ],
  declarations: [OnboardingRadioComponent, OnboardingRadioItemComponent],
  exports: [OnboardingRadioComponent, OnboardingRadioItemComponent],
})
export class OnboardingRadioModule {}
