import { Meta } from '@storybook/angular';
import { IconModule } from '@spryker/icon';
import { SidebarComponent } from './sidebar.component';
import { SidebarModule } from '../sidebar.module';

export default {
    title: 'SidebarComponent',
    component: SidebarComponent,
    parameters: {
        controls: {
            include: ['width', 'collapsedWidth', 'spyId', 'collapsed', 'innerText'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8992',
            allowFullscreen: true,
        },
    },
    args: {
        spyId: 'someId',
        innerText: 'SideBar Content',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [SidebarModule, IconModule],
    },
    template: `
    <spy-sidebar
      [width]="width"
      [collapsedWidth]="collapsedWidth"
      [spyId]="spyId"
      [collapsed]="collapsed">
       <div>{{ innerText }}</div>
    </spy-sidebar>
  `,
});
