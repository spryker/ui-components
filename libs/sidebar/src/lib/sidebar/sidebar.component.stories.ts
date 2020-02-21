import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from '../sidebar.module';

export default {
  title: 'SidebarComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [SidebarModule],
  },
  template: `
    <spy-sidebar collapsed="false">
       <div>SideBar Content</div> 
    </spy-sidebar>
    <ng-template #trigger><span><</span></ng-template>
  `,
});
