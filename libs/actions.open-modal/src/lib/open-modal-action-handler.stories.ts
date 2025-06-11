import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ModalModule, ModalService } from '@spryker/modal';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { ComponentModal, ModalRef, ComponentModalExtras } from '@spryker/modal';
import { OpenModalActionHandlerService } from './open-modal-action-handler.service';

@Component({
    selector: 'spy-modal-content',
    template: `
        <h3>Modal Content</h3>
        <p>This modal was opened via the OpenModalActionHandlerService</p>
        <p *ngIf="__capturedData">Received data: {{ __capturedData | json }}</p>
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

@Component({
    selector: 'spy-story',
    template: `
        <spy-button-action
            [action]="{ type: 'open-modal', component: modalContentComponent }"
            variant="primary"
            size="md"
        >
            Open Simple Modal
        </spy-button-action>
    `,
})
class SimpleStoryComponent {
    modalContentComponent = ModalContentComponent;
}

@Component({
    selector: 'spy-template-modal-content',
    template: `
        <ng-template #modalTemplate let-modalRef="modalRef">
            <h3>Template Modal</h3>
            <p>This modal uses an Angular TemplateRef.</p>
        </ng-template>
        <spy-button-action
            [action]="{ type: 'open-modal', template: modalTemplate, data: { info: 'From template modal' } }"
            variant="primary"
            size="md"
        >
            Open Template Modal
        </spy-button-action>
    `,
})
class TemplateModalStoryComponent {}

@Component({
    selector: 'spy-confirm-modal-story',
    template: `
        <spy-button-action
            [action]="{
                type: 'open-modal',
                confirm: {
                    title: 'Confirm Action',
                    message: 'Are you sure you want to proceed?',
                    okText: 'Yes',
                    cancelText: 'No',
                },
            }"
            variant="primary"
            size="md"
        >
            Open Confirm Modal
        </spy-button-action>
    `,
})
class ConfirmModalStoryComponent {}

export default {
    title: 'OpenModalActionService',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    BrowserAnimationsModule,
                    ActionsModule.withActions({
                        'open-modal': OpenModalActionHandlerService,
                    }),
                    ModalModule.forRoot(),
                ),
            ],
        }),
        moduleMetadata({
            imports: [ButtonModule, ButtonActionModule],
            declarations: [
                SimpleStoryComponent,
                ModalContentComponent,
                TemplateModalStoryComponent,
                ConfirmModalStoryComponent,
            ],
        }),
    ],
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
        <spy-story></spy-story>
        <br><br>
        <spy-template-modal-content></spy-template-modal-content>
        <br><br>
        <spy-confirm-modal-story></spy-confirm-modal-story>
    `,
});
