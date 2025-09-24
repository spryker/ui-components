import { Meta } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CardModule } from '../card.module';

export default {
    title: 'CardComponent',
    component: CardComponent,
    parameters: {
        controls: {
            include: ['spyTitle', 'titlePosition', 'hoverable'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8982',
            allowFullscreen: true,
        },
    },
    argTypes: {
        spyTitle: {
            control: { type: 'text' },
        },
        titlePosition: {
            control: { type: 'select' },
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
