import { Component, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ModalModule, ModalService, ModalRef, ComponentModal, ComponentModalExtras } from '@spryker/modal';
import { ButtonModule } from '@spryker/button';
import { ButtonActionModule } from '@spryker/button.action';
import { ActionsModule } from '@spryker/actions';
import { CloseModalActionHandlerService } from './close-modal-action-handler.service';

@Component({
    standalone: false,
    selector: 'spy-story',
    template: ` <spy-button variant="primary" size="md" (click)="clickHandler()"> Open modal </spy-button> `,
})
class SimpleModalComponent {
    constructor(private modalService: ModalService) {}

    clickHandler(): void {
        this.modalService.openComponent(ModalContentComponent);
    }
}

@Component({
    standalone: false,
    selector: 'spy-modal-content',
    template: `
        <h3>Modal content here...</h3>
        <br />
        <spy-button-action [action]="{ type: 'close-modal' }" variant="primary" size="md">
            Close Modal Via Service
        </spy-button-action>
        <br /><br />
        <spy-button-action [action]="{ type: 'close-modal', result: 'success' }" variant="primary" size="md">
            Close Modal Via Service with Result
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
    title: 'CloseModalActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        'close-modal': CloseModalActionHandlerService,
                    }),
                    ModalModule.forRoot(),
                ),
            ],
        }),
        moduleMetadata({
            imports: [ModalModule, ButtonModule, ButtonActionModule],
            declarations: [SimpleModalComponent, ModalContentComponent],
            entryComponents: [ModalContentComponent],
        }),
    ],
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `<spy-story></spy-story>`,
});
