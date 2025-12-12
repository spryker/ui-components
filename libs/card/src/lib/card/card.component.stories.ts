import { Meta } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CardModule } from '../card.module';

export default {
    title: 'CardComponent',
    component: CardComponent,
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['spyTitle', 'titlePosition', 'hoverable', 'extra', 'actions'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8982',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component:
                    'Card container with title, actions, and content area.\n\n**Slots:**\n- Default slot: Card body content',
            },
        },
    },
    argTypes: {
        spyTitle: {
            control: { type: 'text' },
            description: 'Title of the card (string or template)',
            table: {
                type: { summary: 'string | TemplateRef<void>' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        titlePosition: {
            control: { type: 'select' },
            options: ['left', 'center', 'right'],
            description: 'Horizontal alignment of the card title (left, center, right)',
            table: {
                type: { summary: '"left" | "center" | "right"' },
                defaultValue: { summary: '"left"' },
                category: 'Inputs',
            },
        },
        hoverable: {
            control: { type: 'boolean' },
            description: 'Enables hover effect on the card',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        extra: {
            description: 'Template for extra content in card header',
            table: {
                type: { summary: 'TemplateRef<void>' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        actions: {
            description: 'Array of templates for card action buttons',
            table: {
                type: { summary: 'TemplateRef<void>[]' },
                defaultValue: { summary: '[]' },
                category: 'Inputs',
            },
        },
    },
    args: {
        spyTitle: 'Card Title',
        titlePosition: 'left',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [CardModule],
    },
    template: `
    <spy-card
      [spyTitle]="spyTitle"
      [titlePosition]="titlePosition"
      [hoverable]="hoverable"
      [extra]="extraRef"
      [actions]="[button, button]">
      Card content here
    </spy-card>
    <ng-template #extraRef>
      Some extra
    </ng-template>
    <ng-template #button>
      <button>Button Content</button>
    </ng-template>
  `,
});

export const withInnerCard = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [CardModule],
    },
    template: `
    <spy-card
      [spyTitle]="spyTitle"
      [titlePosition]="titlePosition"
      [hoverable]="hoverable"
      [extra]="extraRef"
      [actions]="[button, button]">
      <spy-card [spyTitle]="spyTitle">
        Card content here
      </spy-card>
    </spy-card>
    <ng-template #extraRef>
      Some extra
    </ng-template>
    <ng-template #button>
      <button>Button Content</button>
    </ng-template>
  `,
});
