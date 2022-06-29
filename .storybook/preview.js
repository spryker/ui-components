// Global styles
import '!style-loader!css-loader!less-loader!./styles.less';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withDesign } from 'storybook-addon-designs';
import docJson from '../dist/documentation.json';

setCompodocJson(docJson);

export const decorators = [withDesign];
export const parameters = {
  controls: {
    hideNoControlsWarning: true,
  },
};
