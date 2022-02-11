import { Meta } from '@storybook/angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutComponent } from './layout.component';
import { LayoutModule } from '../layout.module';

export default {
  title: 'LayoutComponent',
  component: LayoutComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [LayoutModule, NzLayoutModule],
  },
  template: `
    <spy-layout>
      Layout Content
    </spy-layout>
  `,
});
