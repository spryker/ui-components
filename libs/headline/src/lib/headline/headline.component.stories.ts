import { Meta, moduleMetadata } from '@storybook/angular';
import { HeadlineModule } from '../headline.module';
import { HeadlineComponent, Level } from './headline.component';

const LEVEL_OPTIONS = Object.values(Level) as Level[];

export default {
    title: 'HeadlineComponent',
    component: HeadlineComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HeadlineModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['level', 'title', 'actionText'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8972',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Headline component with title and optional actions.\n\n**Slots:**\n- Default slot: Headline text content\n- `[actions]`: Action buttons or links displayed on the right',
            },
        },
    },
    argTypes: {
        level: {
            control: { type: 'select' },
            options: LEVEL_OPTIONS, // <-- array required by SB9
            description: 'Semantic heading level (h1, h2, h3, h4, h5, base)',
            table: {
                type: { summary: 'Level' },
                defaultValue: { summary: 'Level.H1' },
                category: 'Inputs',
            },
        },
    },
    args: {
        level: Level.H1,
        title: 'Title Content',
        actionText: 'Actions Content',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-headline [level]="level">
      {{ title }}
      <div actions>{{ actionText }}</div>
    </spy-headline>
  `,
});
