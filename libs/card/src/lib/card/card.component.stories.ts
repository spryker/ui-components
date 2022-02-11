import { NzCardModule } from 'ng-zorro-antd/card';
import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { CardComponent } from './card.component';
import { CardModule } from '../card.module';

export default {
  title: 'CardComponent',
  component: CardComponent,
  decorators: [withDesign],
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
    imports: [NzCardModule, CardModule],
  },
  template: `
    <spy-card [spyTitle]="spyTitle" [extra]="extraRef" [actions]="[button, button]">
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
    imports: [NzCardModule, CardModule],
  },
  template: `
    <spy-card [spyTitle]="spyTitle" [extra]="extraRef" [actions]="[button, button]">
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
