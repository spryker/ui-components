import { Meta, moduleMetadata } from '@storybook/angular';
import * as icons from '@spryker/icon/icons';
import { Icon } from '@spryker/icon';
import { LinkModule } from '../link.module';
import { LinkComponent } from './link.component';

const iconsModules = Object.keys(icons).map((name) => (icons as any)[name] as Icon);
const iconNames = iconsModules.map((i) => i.icon);

export default {
    title: 'LinkComponent',
    component: LinkComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [LinkModule, ...iconsModules],
        }),
    ],
    parameters: {
        controls: {
            include: ['icon', 'text'],
        },
    },
    argTypes: {
        icon: {
            control: { type: 'select' },
            options: iconNames,
            description: 'Icon to display before the link text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        text: {
            control: { type: 'text' },
            description: 'Link text content',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
    },
    args: {
        icon: iconNames[0],
        text: 'Title Content',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-link [icon]="icon">{{ text }}</spy-link>
  `,
});
