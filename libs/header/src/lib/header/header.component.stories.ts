import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from './header.component';
import { HeaderModule } from '../header.module';

export default {
  title: 'HeaderComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [HeaderModule, NzLayoutModule],
  },
  template: `
    <spy-header>
      Header Content
    </spy-header>
  `,
});
