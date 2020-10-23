import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { CustomElementModule, WebComponentDefs, WebComponentsModule } from '@spryker/web-components';

import { OnboardingRadioComponent, OnboardingRadioItemComponent } from '@spryker/onboarding-radio';
import { OnboardingRadioModule } from '@spryker/onboarding-radio';

export default {
  title: 'OnboardingRadioComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      OnboardingRadioModule,
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule
    ]
  },
  template: `
    <spy-onboarding-radio value="C">
      <spy-onboarding-radio-item value="A">Radio 1...</spy-onboarding-radio-item>
      <spy-onboarding-radio-item value="B" disabled>Radio 2...</spy-onboarding-radio-item>
      <spy-onboarding-radio-item value="C">Radio 3...</spy-onboarding-radio-item>
    </spy-onboarding-radio>
  `,
  props: {
  }
})

@NgModule({
  imports: [
    WebComponentsModule.forRoot(),
    OnboardingRadioModule,
    LocaleModule.forRoot(),
    EnLocaleModule
  ],
  entryComponents: [OnboardingRadioComponent, OnboardingRadioItemComponent],
})
class StoryModule extends CustomElementModule {
  components: WebComponentDefs = [OnboardingRadioComponent, OnboardingRadioItemComponent];

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
    <web-spy-onboarding-radio value="C">
      <web-spy-onboarding-radio-item value="A">Radio 1...</web-spy-onboarding-radio-item>
      <web-spy-onboarding-radio-item value="B" disabled>Radio 2...</web-spy-onboarding-radio-item>
      <web-spy-onboarding-radio-item value="C">Radio 3...</web-spy-onboarding-radio-item>
    </web-spy-onboarding-radio>
  `,
});
