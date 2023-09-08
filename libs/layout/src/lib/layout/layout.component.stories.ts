import { Meta, moduleMetadata } from '@storybook/angular';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from '../layout.module';

export default {
    title: 'LayoutComponent',
    component: LayoutComponent,
    decorators: [
        moduleMetadata({
            imports: [LayoutModule],
        }),
    ],
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-layout>
      Layout Content
    </spy-layout>
  `,
});
