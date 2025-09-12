import { Component, Input, OnChanges, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { NotificationData, NotificationType } from '../types';

@Component({
    standalone: false,
    selector: 'spy-story-selector',
    template: ` <button (click)="notificationService.show(data)">Show Notification</button> `,
})
class StoryComponent implements OnChanges {
    notificationService = inject(NotificationService);

    @Input() title = '';
    @Input() type?: NotificationType;
    @Input() description?: string;
    @Input() closeable?: boolean;
    @Input() timeOut?: number;

    data: NotificationData = {
        title: this.title,
    };

    ngOnChanges() {
        this.data.type = this.type;
        this.data.title = this.title;
        this.data.description = this.description;
        this.data.closeable = this.closeable;
        this.data.timeOut = this.timeOut;
    }
}

export default {
    title: 'NotificationWrapperComponent',
    component: StoryComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(NotificationModule.forRoot())],
        }),
        moduleMetadata({
            declarations: [StoryComponent],
            imports: [NotificationModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['type', 'closeable', 'title', 'description', 'timeOut'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8980',
            allowFullscreen: true,
        },
    },
    argTypes: {
        type: {
            control: { type: 'select' },
            options: NotificationType,
        },
    },
    args: {
        type: NotificationType.Info,
        title: 'Test Title',
        description: 'Test Description',
        closeable: true,
        timeOut: 3000,
    },
} as Meta;

export const primary = (args) => ({
    props: args,
});
