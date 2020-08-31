import { OnboardingRadioModule } from '../onboarding-radio.module';
import { LocaleModule } from '@spryker/locale';
import { EnLocaleModule } from '@spryker/locale/locales/en';
import {
  WebComponentsModule,
  CustomElementModule,
  WebComponentDefs,
} from '@spryker/web-components';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnboardingRadioComponent } from './onboarding-radio.component';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';

export default {
  title: 'OnboardingRadioComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [OnboardingRadioModule, LocaleModule.forRoot(), EnLocaleModule],
  },
  template: `
    <spy-onboarding-radio value="A">
      <spy-onboarding-radio-item value="A">
        Radio Content 1
      </spy-onboarding-radio-item>
      <spy-onboarding-radio-item value="B" disabled="true">
        Radio Content 2
      </spy-onboarding-radio-item>
      <spy-onboarding-radio-item value="C">
        Radio Content 3
      </spy-onboarding-radio-item>
    </spy-onboarding-radio>
  `,
});

@NgModule({
  imports: [
    WebComponentsModule.forRoot(),
    OnboardingRadioModule,
    LocaleModule.forRoot(),
    EnLocaleModule,
  ],
  entryComponents: [OnboardingRadioComponent, OnboardingRadioItemComponent],
})
class StoryModule extends CustomElementModule {
  components: WebComponentDefs = [
    OnboardingRadioComponent,
    OnboardingRadioItemComponent,
  ];

  constructor(injector: Injector) {
    super(injector);
    super.ngDoBootstrap();
  }
}

export const asWebComponents = () => ({
  moduleMetadata: {
    imports: [StoryModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-onboarding-radio value="A">
      <web-spy-onboarding-radio-item value="A">
        Web Radio Content 1
      </web-spy-onboarding-radio-item>
      <web-spy-onboarding-radio-item value="B" disabled="true">
        Web Radio Content 2
      </web-spy-onboarding-radio-item>
      <web-spy-onboarding-radio-item value="C">
        Web Radio Content 3
      </web-spy-onboarding-radio-item>
    </web-spy-onboarding-radio>
  `,
});
