import { IconModule } from '@spryker/icon';

import { SidebarModule } from '../sidebar.module';

export default {
  title: 'SidebarComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [SidebarModule, IconModule],
  },
  template: `
    <spy-sidebar>
       <div>SideBar Content</div>
    </spy-sidebar>
  `,
});
