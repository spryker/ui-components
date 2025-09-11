import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

import { ModalOptions, ModalRef, ModalTemplateContext } from '../../types';

interface RenderBindContext {
    $implicit?: string;
}

interface RenderTplContext {
    $implicit?: TemplateRef<ModalTemplateContext<any>>;
}

@Component({
    selector: 'spy-modal',
    template: `
        <div class="modal">
          @if (options.title) {
            <div class="modal-header">
              <ng-container *ngTemplateOutlet="headerTpl; context: headerCtx"></ng-container>
            </div>
          }
          <section class="modal-content">
            <ng-template #content></ng-template>
          </section>
          @if (options.footer) {
            <div class="modal-footer">
              <ng-container *ngTemplateOutlet="footerTpl; context: footerCtx"></ng-container>
            </div>
          }
          <ng-template #headerBind let-value
            ><h1>{{ value }}</h1></ng-template
            >
            <ng-template #renderBind let-value>{{ value }}</ng-template>
            <ng-template #renderTpl let-tpl>
              <ng-container *ngTemplateOutlet="tpl; context: modalContext"></ng-container>
            </ng-template>
          </div>
        `,
    styles: [
        `
            .modal {
                display: block;
                width: 100%;
                height: 100%;
                min-height: inherit;
                max-height: inherit;
                background: gray;
                box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
            }
        `,
    ],
})
export class ModalWrapperComponent {
    @ViewChild('content', { read: ViewContainerRef, static: true })
    contentVcr!: ViewContainerRef;

    @ViewChild('headerBind', { static: true })
    headerBind!: TemplateRef<RenderBindContext>;
    @ViewChild('renderBind', { static: true })
    renderBind!: TemplateRef<RenderBindContext>;
    @ViewChild('renderTpl', { static: true })
    renderTpl!: TemplateRef<RenderTplContext>;

    headerTpl!: TemplateRef<RenderBindContext | RenderTplContext>;
    headerCtx!: { $implicit: any };

    footerTpl!: TemplateRef<RenderBindContext | RenderTplContext>;
    footerCtx!: { $implicit: any };

    modalRef!: ModalRef<any, any>;
    options!: ModalOptions<any>;
    modalContext!: ModalTemplateContext<any>;

    setModalRef(modalRef: ModalRef<any, any>): void {
        this.modalRef = modalRef;
        this.modalContext = { $implicit: modalRef };
    }

    setModalOptions(options: ModalOptions<any>): void {
        this.options = options;

        this.headerTpl = typeof options.title === 'string' ? this.headerBind : this.renderTpl;
        this.headerCtx = { $implicit: options.title };

        this.footerTpl = typeof options.footer === 'string' ? this.renderBind : this.renderTpl;
        this.footerCtx = { $implicit: options.footer };
    }
}
