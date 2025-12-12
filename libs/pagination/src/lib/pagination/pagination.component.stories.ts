import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '../pagination.module';

export default {
    title: 'PaginationComponent',
    component: PaginationComponent,
    tags: ['autodocs'],
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
        total: {
            control: { type: 'number' },
            description: 'Total number of items',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Inputs',
            },
        },
        page: {
            control: { type: 'number' },
            description: 'Current page number (1-based)',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
                category: 'Inputs',
            },
        },
        pageSize: {
            control: { type: 'number' },
            description: 'Number of items per page',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' },
                category: 'Inputs',
            },
        },
        hideOnSinglePage: {
            control: { type: 'boolean' },
            description: 'Hides pagination when there is only one page',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        pageSizeOptions: {
            control: { type: 'object' },
            description: 'Array of available page size options for the selector',
            table: {
                type: { summary: 'number[]' },
                defaultValue: { summary: '[10, 20, 50]' },
                category: 'Inputs',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the page size selector',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '""' },
                category: 'Inputs',
            },
        },
        disableClear: {
            control: { type: 'boolean' },
            description: 'Disables the clear button in page size selector',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        pageChange: {
            description: 'Emits when current page changes',
            table: {
                type: { summary: 'EventEmitter<number>' },
                category: 'Outputs',
            },
        },
        pageSizeChange: {
            description: 'Emits when page size changes',
            table: {
                type: { summary: 'EventEmitter<number>' },
                category: 'Outputs',
            },
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
