import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../dist/documentation.json';
// Needed for Orchestrator
import 'core-js/features/reflect';

setCompodocJson(docJson);

export const parameters = {
    controls: {
        hideNoControlsWarning: true,
    },
};
