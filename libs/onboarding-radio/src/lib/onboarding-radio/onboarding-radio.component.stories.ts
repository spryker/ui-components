import { text } from '@storybook/addon-knobs';
import { OnboardingRadioComponent } from './onboarding-radio.component';
import { OnboardingRadioModule } from '@spryker/onboarding-radio';

export default {
  title: 'OnboardingRadioComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [OnboardingRadioModule]
  },
  template: `
    <spy-onboarding-radio value="A">
        <spy-onboarding-radio-item value="A">Radio 1...</spy-onboarding-radio-item>
        <spy-onboarding-radio-item value="B" disabled>Radio 2...</spy-onboarding-radio-item>
        <spy-onboarding-radio-item value="C">Radio 3...</spy-onboarding-radio-item>
    </spy-onboarding-radio>
  `,
  props: {
    value: text('value', 'C'),
  }
})