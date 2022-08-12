import { Meta } from '@storybook/angular';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from '../layout.module';

export default {
    title: 'LayoutComponent',
    component: LayoutComponent,
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [LayoutModule],
    },
    template: `
    <spy-layout>
      Layout Content
    </spy-layout>
  `,
});
