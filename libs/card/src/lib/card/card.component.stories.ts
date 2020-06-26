import { NzCardModule } from 'ng-zorro-antd/card';

import { CardModule } from '../card.module';

export default {
  title: 'CardComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzCardModule, CardModule],
  },
  template: `
    <spy-card title="Card Title" [extra]="extraRef" [actions]="[button, button]">
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

export const withInnerCard = () => ({
  moduleMetadata: {
    imports: [NzCardModule, CardModule],
  },
  template: `
    <spy-card title="Card Title" [extra]="extraRef" [actions]="[button, button]">
      <spy-card title="Card Title">
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
