import { configure, addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

import '../config';

addDecorator(withKnobs);
configure(require.context('../../libs', true, /\.stories\.tsx?$/), module);
