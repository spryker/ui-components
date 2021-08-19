import { OnboardingRadioItemComponent } from './onboarding-radio-item.component';

export default {
  title: 'OnboardingRadioItemComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  template: `
<!--    <spy-onboarding-radio-item value='A'>Radio 1...</spy-onboarding-radio-item>-->
<!--    <spy-onboarding-radio-item value='B'>Radio 2...</spy-onboarding-radio-item>-->
<!--    <spy-onboarding-radio-item value='C'>Radio 3...</spy-onboarding-radio-item>-->
  `,
  props: {},
});
