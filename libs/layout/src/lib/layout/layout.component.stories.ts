import { LayoutComponent } from './layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutModule } from '../layout.module';

export default {
    title: 'LayoutComponent',
};

export const primary = () => ({
    moduleMetadata: {
        imports: [LayoutModule, NzLayoutModule],
    },
    template: `
    <spy-layout>
      Layout Content
    </spy-layout>
  `,
});
