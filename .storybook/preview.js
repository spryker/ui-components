import { setCompodocJson } from '@storybook/addon-docs/angular';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import docJson from '../dist/documentation.json';
// Needed for Orchestrator
import 'reflect-metadata/lite';

setCompodocJson(docJson);

export const parameters = {
    controls: {
        hideNoControlsWarning: true,
    },
};
export const tags = ['autodocs'];
