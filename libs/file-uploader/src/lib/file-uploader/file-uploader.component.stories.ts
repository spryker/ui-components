import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { FileUploaderModule } from '../file-uploader.module';
import { FileUploaderComponent } from './file-uploader.component';

export default {
    title: 'FileUploaderComponent',
    component: FileUploaderComponent,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [FileUploaderModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2055%3A9154',
            allowFullscreen: true,
        },
    },
    argTypes: {
        acceptedTypes: {
            name: 'Accepted File Types',
            options: ['image/*', '.pdf,.doc,.docx,.txt', 'video/*'],
            control: {
                type: 'select', // Explicitly force the select control
            },
            table: {
                category: 'Inputs',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the file uploader',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
        multiple: {
            control: { type: 'boolean' },
            description: 'Enables multiple file upload for the file uploader',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Inputs',
            },
        },
    },
    args: {
        acceptedTypes: '',
        disabled: false,
        multiple: true,
    },
} as Meta;

export const primary = (args: any) => ({
    props: args,
    template: `
    <div style="padding: 80px; display: flex; justify-content: center;">
      <spy-file-uploader
        [acceptedTypes]="acceptedTypes"
        [disabled]="disabled",
        [multiple]="multiple">
        Upload file
      </spy-file-uploader>
    </div>
  `,
});