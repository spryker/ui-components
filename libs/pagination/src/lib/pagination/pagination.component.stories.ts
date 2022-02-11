import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '../pagination.module';

export default {
  title: 'PaginationComponent',
  component: PaginationComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: [
        'total',
        'page',
        'pageSize',
        'hideOnSinglePage',
        'pageSizeOptions',
        'disableClear',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8990',
      allowFullscreen: true,
    },
  },
  argTypes: {
    hideOnSinglePage: {
      control: { type: 'boolean' },
    },
    pageSizeOptions: {
      control: { type: 'array' },
    },
    disableClear: {
      control: { type: 'boolean' },
    },
  },
  args: {
    total: 300,
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [PaginationModule, NzPaginationModule, BrowserAnimationsModule],
  },
});
