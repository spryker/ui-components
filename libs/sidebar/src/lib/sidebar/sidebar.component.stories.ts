import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from '../sidebar.module';

export default {
  title: 'SidebarComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [SidebarModule, NzLayoutModule],
  },
  template: `
    <spy-sidebar [trigger]="trigger">
       <div>SideBar Content</div> 
    </spy-sidebar>
    <ng-template #trigger><span><</span></ng-template>
  `,
});
