import { NgModule, Component, Input, OnChanges } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { NotificationModule } from '../notification.module';
import { NotificationService } from '../notification.service';
import { NotificationWrapperComponent } from './notification-wrapper.component';
import { NotificationData, NotificationType } from '../types';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'story-selector',
    template: ` <button (click)="notificationService.show(data)">Show Notification</button> `,
})
class StoryComponent implements OnChanges {
    constructor(public notificationService: NotificationService) {}
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

@NgModule({
    imports: [BrowserAnimationsModule, NotificationModule.forRoot()],
    declarations: [StoryComponent],
    exports: [NotificationModule, StoryComponent],
})
class StoryModule {}

export default {
    title: 'NotificationWrapperComponent',
    component: StoryComponent,
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
    moduleMetadata: {
        imports: [StoryModule],
    },
});
