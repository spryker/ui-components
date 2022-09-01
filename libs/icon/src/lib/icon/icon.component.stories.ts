import { Meta } from '@storybook/angular';
import * as icons from '@spryker/icon/icons';
import { IconModule } from '../icon.module';
import { IconComponent } from './icon.component';
import { Icon } from './types';

export default {
    title: 'IconComponent',
    component: IconComponent,
    parameters: {
        controls: {
            include: ['name', 'iconColor'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8966',
            allowFullscreen: true,
        },
    },
} as Meta;

const iconsModules = Object.keys(icons).map((name) => (icons as any)[name] as Icon);
const iconNames = iconsModules.map((i) => i.icon);

export const allIcons = (args) => ({
    props: {
        ...args,
        icons: iconNames,
    },
    moduleMetadata: {
        imports: [IconModule, ...iconsModules],
    },
    template: `
    <p *ngFor="let icon of icons">
      <spy-icon [name]="icon" [style.color]="iconColor"></spy-icon>
      ({{ icon }})
    </p>
  `,
});
allIcons.args = {
    iconColor: '',
};
allIcons.argTypes = {
    name: {
        table: {
            disable: true,
        },
    },
};

export const icon = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [IconModule, ...iconsModules],
    },
});
icon.args = {
    name: iconNames[0],
};
icon.argTypes = {
    name: {
        control: { type: 'select' },
        options: iconNames,
    },
};
