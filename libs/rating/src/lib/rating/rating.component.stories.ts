import { Meta, moduleMetadata } from '@storybook/angular';
import { RatingModule } from '../rating.module';
import { RatingComponent } from './rating.component';

export default {
    title: 'RatingComponent',
    component: RatingComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [RatingModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['rating', 'maxRating', 'allowHalf', 'readOnly'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2193%3A7667',
            allowFullscreen: true,
        },
    },
    argTypes: {
        rating: {
            control: { type: 'number' },
            description: 'Current rating value',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 'undefined' },
                category: 'Inputs',
            },
        },
        maxRating: {
            control: { type: 'number' },
            description: 'Maximum rating value (number of stars)',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '5' },
                category: 'Inputs',
            },
        },
        allowHalf: {
            control: { type: 'boolean' },
            description: 'Enables half-star ratings',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Inputs',
            },
        },
        readOnly: {
            control: { type: 'boolean' },
            description: 'Makes the rating read-only (not interactive)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        ratingChange: {
            description: 'Emits when rating value changes',
            table: {
                type: { summary: 'EventEmitter<number>' },
                category: 'Outputs',
            },
        },
    },
    args: {
        rating: 3.35,
        maxRating: 5,
        allowHalf: true,
        readOnly: false,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
