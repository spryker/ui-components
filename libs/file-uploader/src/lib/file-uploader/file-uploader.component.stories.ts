import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { FileUploaderModule } from '../file-uploader.module';
import { FileUploaderComponent } from './file-uploader.component';
import { FileUploaderService } from '../file-uploader.service';
import { HttpEventType } from '@angular/common/http';
import { concat, of } from 'rxjs';
import { delay as rxDelay } from 'rxjs/operators';

const meta: Meta<FileUploaderComponent> = {
    title: 'Components/FileUploader', // Adding a folder prefix helps refresh the sidebar
    component: FileUploaderComponent,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [FileUploaderModule],
        }),
    ],
    argTypes: {
        acceptedTypes: {
            control: {
                type: 'select',
            },
            options: ['Images', 'Docs'],
            mapping: {
                Images: 'image/*',
                Docs: '.doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, application/pdf',
            }
        },
    },
    args: {
        acceptedTypes: '',
        disabled: false,
        multiple: true,
        sendUrl: '/api/upload',
        name: 'spryker-file-uploader',
    },
};

export default meta;
type Story = StoryObj<FileUploaderComponent>;

class MockFileUploaderServiceWithProgress {
    uploadFiles() {
        const steps = [25, 50, 75, 100].map((loaded) =>
            of({ type: HttpEventType.UploadProgress, loaded, total: 100 }).pipe(rxDelay(500)),
        );
        return concat(
            ...steps,
            of({ type: HttpEventType.Response, status: 200, body: { status: 'success' } }).pipe(rxDelay(300)),
        );
    }

    deleteFile(fileList: File[], fileIndex: number) {
        return fileList.splice(fileIndex, 1);
    }
}

// This replaces your 'primary'
export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
        <div style="padding: 80px; display: flex; justify-content: center;">
          <spy-file-uploader
            [name]="name"
            [acceptedTypes]="acceptedTypes"
            [disabled]="disabled"
            [multiple]="multiple"
            [dragAndDropEnabled]="dragAndDropEnabled"
            [title]="title"
            [subtitle]="subtitle"
            [sendUrl]="sendUrl">
          </spy-file-uploader>
        </div>
      `,
    }),
};

export const DragAndDrop: Story = {
    ...Default,
    args: {
        dragAndDropEnabled: true,
        title: 'Click or drag file to this area to upload',
        subtitle: 'Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.',
    },
    decorators: [
        moduleMetadata({
            providers: [{ provide: FileUploaderService, useClass: MockFileUploaderServiceWithProgress }],
        }),
    ],
};

export const UploadSuccess: Story = {
    ...Default,
    decorators: [
        moduleMetadata({
            providers: [{ provide: FileUploaderService, useClass: MockFileUploaderServiceWithProgress }],
        }),
    ],
};

export const UploadError: Story = {
    ...Default,
    parameters: {
        mockData: [
            {
                url: '/api/upload',
                method: 'GET',
                status: 500,
                response: { message: 'Server error' },
            },
        ],
    },
};

export const PostFormSubmit: Story = {
    ...Default,
    args: {
        sendUrl: '',
    },
};