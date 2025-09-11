import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

import { NotificationRef } from '../notification-ref';

@Component({
    standalone: false,
    selector: 'spy-notification-wrapper',
    templateUrl: './notification-wrapper.component.html',
    styleUrls: ['./notification-wrapper.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-notification-wrapper',
    },
    animations: [
        trigger('flyInOut', [
            state(
                'inactive',
                style({
                    opacity: 0,
                    transform: 'translateX(100%)',
                }),
            ),
            state(
                'void',
                style({
                    opacity: 0,
                    transform: 'translateX(100%)',
                }),
            ),
            state(
                'removed',
                style({
                    opacity: 0,
                    transform: 'translateX(100%)',
                }),
            ),
            state(
                'active',
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                }),
            ),

            transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
            transition('active => void', animate('{{ easeTime }}ms {{ easing }}')),
            transition('active => removed', animate('{{ easeTime }}ms {{ easing }}')),
        ]),
    ],
})
export class NotificationWrapperComponent extends Toast {
    @HostBinding('@flyInOut')
    state = {
        value: 'inactive',
        params: this.toastPackage.config,
    } as const;

    constructor(
        toastrService: ToastrService,
        toastPackage: ToastPackage,
        private cdr: ChangeDetectorRef,
    ) {
        super(toastrService, toastPackage);
    }

    notificationRef?: NotificationRef;

    closeHandler(): void {
        this.notificationRef?.close();
    }

    activateToast() {
        super.activateToast();
        this.cdr.markForCheck();
    }
}
