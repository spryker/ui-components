import { Meta, moduleMetadata } from '@storybook/angular';
import { HeadlineModule } from '../headline.module';
import { HeadlineComponent, Level } from './headline.component';

export default {
    title: 'HeadlineComponent',
    component: HeadlineComponent,
    decorators: [
        moduleMetadata({
            imports: [HeadlineModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8972',
            allowFullscreen: true,
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
