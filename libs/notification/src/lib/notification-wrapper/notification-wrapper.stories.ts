import { AfterViewInit, Component, Input, OnChanges, OnDestroy, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { NotificationModule } from '../notification.module';
import { NotificationRef } from '../notification-ref';
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

/**
 * Shows its toast from `ngAfterViewInit` rather than from a click, and disables the dismiss
 * timeout so the toast is still on screen when the capture is taken. The `primary` story needs a
 * click, so without this the rendered toast — the only place `NotificationWrapperComponent` ever
 * appears — is outside the visual gate entirely.
 */
@Component({
    standalone: false,
    selector: 'spy-story-opened-toast',
    template: '',
})
class OpenedToastComponent implements AfterViewInit, OnDestroy {
    notificationService = inject(NotificationService);

    @Input() title = '';
    @Input() type?: NotificationType;
    @Input() description?: string;
    @Input() closeable?: boolean;

    private notificationRef?: NotificationRef;

    ngAfterViewInit(): void {
        this.notificationRef = this.notificationService.show({
            type: this.type,
            title: this.title,
            description: this.description,
            closeable: this.closeable,
            timeOut: 0,
            disableTimeOut: true,
        });
    }

    ngOnDestroy(): void {
        this.notificationRef?.close();
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
            options: Object.values(NotificationType),
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

export const openedToast = (args) => ({
    props: args,
    moduleMetadata: {
        declarations: [OpenedToastComponent],
    },
    template: `
        <spy-story-opened-toast
            [type]="type"
            [title]="title"
            [description]="description"
            [closeable]="closeable"
        ></spy-story-opened-toast>
    `,
});
openedToast.argTypes = {
    timeOut: {
        table: {
            disable: true,
        },
    },
};
