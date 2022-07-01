import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '../pagination.module';

export default {
    title: 'PaginationComponent',
    component: PaginationComponent,
    parameters: {
        controls: {
            include: ['total', 'page', 'pageSize', 'hideOnSinglePage', 'pageSizeOptions', 'disableClear'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8990',
            allowFullscreen: true,
        },
    },
    argTypes: {
        pageSizeOptions: {
            control: { type: 'array' },
        },
    },
    args: {
        total: 300,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [PaginationModule, BrowserAnimationsModule],
    },
});
