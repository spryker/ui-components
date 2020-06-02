import { HtmlRendererComponent } from './html-renderer.component';
import { select } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

export default {
  title: 'HtmlRendererComponent',
};

export const primary = (): IStory => ({
  moduleMetadata: {
    declarations: [HtmlRendererComponent],
  },
  template: `
    lorem
  `,
  props: {},
});
