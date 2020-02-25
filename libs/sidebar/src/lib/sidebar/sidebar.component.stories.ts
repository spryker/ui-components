import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from '../sidebar.module';
import { IconModule } from '@spryker/icon';

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
