import { NzCardModule } from 'ng-zorro-antd/card';

import { CardModule } from '../card.module';
import { boolean } from '@storybook/addon-knobs';

export default {
  title: 'CardComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzCardModule, CardModule],
  },
  template: `
    <spy-card spyTitle="Card Title" [extra]="extraRef" [actions]="[button, button]" [hoverable]="hoverable">
      Card content here
    </spy-card>
    <ng-template #extraRef>
      Some extra
    </ng-template>
    <ng-template #button>
      <button>Button Content</button>
    </ng-template>
  `,
  props: {
    hoverable: boolean('Hoverable', false),
  },
});

export const withInnerCard = () => ({
  moduleMetadata: {
    imports: [NzCardModule, CardModule],
  },
  template: `
    <spy-card spyTitle="Card Title" [extra]="extraRef" [actions]="[button, button]" [hoverable]="hoverable">
      <spy-card spyTitle="Card Title">
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
  props: {
    hoverable: boolean('Hoverable', false),
  },
});
