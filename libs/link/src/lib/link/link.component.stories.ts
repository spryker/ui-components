import { Meta } from '@storybook/angular';
import * as icons from '@spryker/icon/icons';
import { Icon } from '@spryker/icon';
import { LinkModule } from '../link.module';
import { LinkComponent } from './link.component';

const iconsModules = Object.keys(icons).map((name) => (icons as any)[name] as Icon);
const iconNames = iconsModules.map((i) => i.icon);

export default {
    title: 'LinkComponent',
    component: LinkComponent,
    parameters: {
        controls: {
            include: ['icon', 'text'],
        },
    },
    argTypes: {
        icon: {
            control: { type: 'select' },
            options: iconNames,
        },
    },
    args: {
        icon: iconNames[0],
        text: 'Title Content',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [LinkModule, ...iconsModules],
    },
    template: `
    <spy-link [icon]="icon">{{ text }}</spy-link>
  `,
});
