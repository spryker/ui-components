import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ModalModule, ModalService } from '@spryker/modal';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { ComponentModal, ModalRef, ComponentModalExtras } from '@spryker/modal';
import { RefreshModalActionHandlerService } from './refresh-modal-action-handler.service';

@Component({
    selector: 'spy-story',
    template: `<spy-button variant="primary" size="md" (click)="clickHandler()">Open Modal</spy-button>`,
})
class SimpleStoryComponent {
    constructor(private modalService: ModalService) {}

    clickHandler(): void {
        this.modalService.openComponent(ModalContentComponent);
    }
}

@Component({
    selector: 'spy-modal-content',
    template: `
        <h3>Modal content: {{ __capturedData?.message || 'No updated data yet' }}</h3>

        <spy-button-action
            [action]="{ type: 'refresh-modal', data: { message: 'Data has been refreshed!' } }"
            variant="primary"
            size="md">
            Refresh Modal Content
        </spy-button-action>
    `,
})
class ModalContentComponent implements ComponentModal {
    __capturedData: any;
    __capturedResult: any;

    private modalRef: ModalRef<ModalContentComponent, any>;

    setModalRef(modalRef: ModalRef<this, ComponentModalExtras<this>>): void {
        this.modalRef = modalRef as any;
    }

    updateModalData(data: any): void {
        this.__capturedData = data;
    }
}

export default {
    title: 'RefreshModalActionService',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    BrowserAnimationsModule,
                    ActionsModule.withActions({
                        'refresh-modal': RefreshModalActionHandlerService,
                    }),
                    ModalModule.forRoot(),
                ),
            ],
        }),
        moduleMetadata({
            imports: [ButtonModule, ButtonActionModule],
            declarations: [SimpleStoryComponent, ModalContentComponent]
        }),
    ]
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `<spy-story></spy-story>`,
});
