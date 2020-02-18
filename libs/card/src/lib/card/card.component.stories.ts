import { NzCardModule } from 'ng-zorro-antd/card';
import { CardComponent } from './card.component';
import { CardModule } from '../card.module';
import { ButtonModule } from '@spryker/button';
import { LogoModule } from '@spryker/logo';

export default {
  title: 'CardComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [NzCardModule, CardModule, ButtonModule, LogoModule],
  },
  template: `
    <div style="width: 190px; height: 80px;">
        <spy-logo></spy-logo>
    </div>
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
