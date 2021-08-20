import { OnboardingRadioComponent } from './onboarding-radio.component';
import { OnboardingRadioModule } from '../onboarding-radio.module';
import { IStory } from '@storybook/angular';
import { WebComponentsModule } from '@spryker/web-components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';

export default {
  title: 'OnboardingRadioComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [OnboardingRadioModule],
  },
  template: `
  <spy-onboarding-radio value="A">
    <spy-onboarding-radio-item value="A">Radio 1...</spy-onboarding-radio-item>
    <spy-onboarding-radio-item value="B" disabled>Radio 2...</spy-onboarding-radio-item>
    <spy-onboarding-radio-item value="C">Radio 3...</spy-onboarding-radio-item>
  </spy-onboarding-radio>
  `,
  props: {},
});
export const asWebComponent = (): IStory => {
  return {
    moduleMetadata: {
      imports: [
        WebComponentsModule.forRoot(),
        WebComponentsModule.withComponents([
          { component: OnboardingRadioComponent, isRoot: true },
        ]),
        OnboardingRadioModule,
      ],
      entryComponents: [OnboardingRadioComponent, OnboardingRadioItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
    template: `
      <web-spy-onboarding-radio value="A">
        <spy-onboarding-radio-item value="A">Radio 1...</spy-onboarding-radio-item>
        <spy-onboarding-radio-item value="B" disabled>Radio 2...</spy-onboarding-radio-item>
        <spy-onboarding-radio-item value="C">Radio 3...</spy-onboarding-radio-item>
      </web-spy-onboarding-radio>    `,
  };
};
