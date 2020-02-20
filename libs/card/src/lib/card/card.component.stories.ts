import { NzCardModule } from 'ng-zorro-antd/card';
import { CardComponent } from './card.component';
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
