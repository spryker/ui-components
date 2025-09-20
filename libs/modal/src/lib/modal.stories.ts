import { Component, importProvidersFrom, Input, TemplateRef, inject } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';
import { HtmlModalStrategy } from './strategies';

export default {
    title: 'ModalComponent',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(ModalModule.forRoot()),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [ModalModule],
        }),
    ],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8988',
            allowFullscreen: true,
        },
    },
} as Meta;

@Component({
    standalone: false,
    selector: 'spy-story',
    template: `
        <h3>Content</h3>

        <p>
            <button (click)="closeAll()">Close All</button>
        </p>

        <p>
            <button (click)="openModalTpl(modal)">Open Template</button>
        </p>

        <p>
            <button (click)="openModalHtml()">Open Html</button>
        </p>

        <p>
            <button (click)="openModalWithHtmlReplacement()">Open HTML with Content Replacement</button>
        </p>

        <ng-template #modal let-data let-modal="modalRef">
            Modal content here! {{ data }}
            <button (click)="modal.close()">Close</button>
        </ng-template>
    `,
})
class StoryComponent {
    private modalService = inject(ModalService);

    @Input() hasBackdrop?: boolean;

    private modalNumber = 0;
    private currentModal: any;

    closeAll() {
        this.modalService.closeAll();
    }

    openModalTpl(template: TemplateRef<any>) {
        this.modalService.openTemplate(template, {
            title: 'Template Modal',
            data: ++this.modalNumber,
            backdrop: this.hasBackdrop,
        });
    }

    openModalHtml() {
        const modal = this.modalService.open(
            new HtmlModalStrategy({
                html: (name) => `
                  <h3>Hello ${name}</h3>
                  Content from <b>html</b>!
                  <button class="close">Close</button>
                `,
                process: (children, modalRef) => {
                    const button = children.find((c) => (c as HTMLElement).classList?.contains('close')) as HTMLElement;
                    button.addEventListener('click', () => modalRef.close());
                },
            }),
            {
                title: 'Html Modal',
                data: 'Nark',
                backdrop: this.hasBackdrop,
            },
        );

        setTimeout(() => modal.updateData('World'), 200);
    }

    openModalWithHtmlReplacement() {
        const modal = this.modalService.open(
            new HtmlModalStrategy({
                html: `
                    <h3>HTML Content Replacement Demo</h3>
                    <div>Original content</div>
                    <button class="update">Replace Content</button>
                    <button class="close">Close</button>
                `,
                process: (children, modalRef) => {
                    const updateButton = children.find((c) =>
                        (c as HTMLElement).classList?.contains('update'),
                    ) as HTMLElement;
                    const closeButton = children.find((c) =>
                        (c as HTMLElement).classList?.contains('close'),
                    ) as HTMLElement;

                    updateButton?.addEventListener('click', () => {
                        const newContent = `
                            <h3>HTML Content Replacement Demo</h3>
                            <div>Replaced content</div>
                        `;
                        modalRef.updateHtml(newContent);
                    });

                    closeButton?.addEventListener('click', () => modalRef.close());
                },
            }),
            {
                title: 'HTML Content Replacement Demo',
                width: '500px',
                backdrop: this.hasBackdrop,
            },
        );

        this.currentModal = modal;
    }
}

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        declarations: [StoryComponent],
    },
    template: `<spy-story [hasBackdrop]="hasBackdrop"></spy-story>`,
});
primary.args = {
    hasBackdrop: true,
};

@Component({
    standalone: false,
    selector: 'spy-simple-modal',
    template: `
        <spy-modal [(visible)]="visible">
            <ng-template let-modalRef="modalRef">
                <h3>Modal content here...</h3>

                <button (click)="modalRef.close()">Close</button>
            </ng-template>
        </spy-modal>
        <button (click)="visible = !visible">Modal drawer</button>
    `,
})
class SimpleModalComponent {
    visible = false;
}

export const viaModalComponent = (args) => ({
    props: args,
    moduleMetadata: {
        declarations: [SimpleModalComponent],
    },
    template: `<spy-simple-modal></spy-simple-modal>`,
});

@Component({
    standalone: false,
    selector: 'spy-confirm-modal',
    template: `
        <p>
            <button (click)="openConfirm()">Open Confirm</button>
        </p>

        <ng-template #modal let-data let-modal="modalRef"> Explanatory text goes here. </ng-template>
    `,
})
class ConfirmationComponent {
    private modalService = inject(ModalService);

    @Input() hasBackdrop?: boolean;
    @Input() hasDescription?: boolean;

    closeAll() {
        this.modalService.closeAll();
    }

    openConfirm() {
        this.modalService
            .openConfirm({
                description: this.hasDescription ? 'Explanatory text goes here.' : undefined,
                backdrop: this.hasBackdrop,
            })
            .afterDismissed()
            .subscribe((isSure) => console.info('Was sure?', isSure));
    }
}

export const confirmation = (args) => ({
    props: args,
    moduleMetadata: {
        declarations: [ConfirmationComponent],
    },
    template: `<spy-confirm-modal [hasBackdrop]="hasBackdrop" [hasDescription]="hasDescription"></spy-confirm-modal>`,
});
confirmation.args = {
    hasBackdrop: true,
    hasDescription: true,
};
