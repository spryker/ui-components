import { NzCardModule } from 'ng-zorro-antd/card';
import { CardComponent } from './card.component';
import { CardModule } from '../card.module';
import { ButtonModule } from '@spryker-ui/button';

export default {
  title: 'CardComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzCardModule, CardModule, ButtonModule],
  },
  template: `
    <spy-card title="Card Title" [extra]="extraRef" [actions]="[button, button]">
      Card content here
      <spy-button>Button Content</spy-button>
    </spy-card>
    <ng-template #extraRef>
      Some extra
    </ng-template>
    <ng-template #button>
      <spy-button>Button Content</spy-button>
    </ng-template>
  `,
});
