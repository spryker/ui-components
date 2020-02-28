import { configure, addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import '../../../.storybook/config';

addDecorator(withKnobs);
configure(require.context('../src/lib', true, /\.stories\.tsx?$/), module);
