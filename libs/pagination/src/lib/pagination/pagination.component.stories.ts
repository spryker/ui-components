import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '../pagination.module';

export default {
    title: 'PaginationComponent',
    component: PaginationComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [PaginationModule],
        }),
    ],
    parameters: {
        controls: {
            include: [
                'total',
                'page',
                'pageSize',
                'hideOnSinglePage',
                'pageSizeOptions',
                'placeholder',
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
        pageSizeOptions: {
            control: { type: 'array' },
        },
    },
    args: {
        total: 300,
        page: 1,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50],
        placeholder: '',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
