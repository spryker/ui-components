import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabsModule } from '../tabs.module';
import { TabsComponent } from './tabs.component';

export default {
  title: 'TabsComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [TabsModule, NzTabsModule],
  },
  template: `
    <spy-tabs>
      <nz-tab nzTitle="Tab 1">
        Tab Content
      </nz-tab>
    </spy-tabs>
  `,
});
