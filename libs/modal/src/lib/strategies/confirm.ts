import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { asModal } from '../modal';
import {
  AnyModal,
  InferModalData,
  ModalOptions,
  ModalRef,
  ModalTemplateContext,
} from '../types';
import {
  ComponentModal,
  ComponentModalExtras,
  ComponentModalRenderingRef,
  ComponentModalStrategy,
} from './component';

export interface ConfirmModalData {
  title?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  description?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  icon?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  okText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  okType?: string;
  cancelText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  cancelType?: string;
}

@Component({
  selector: 'spy-confirm-modal',
  template: `
    <ng-template #title
      ><h1>{{ data.title }}</h1></ng-template
    >
    <div class="description" *ngIf="data?.description">
      {{ data?.description }}
    </div>
    <ng-template #footer let-modal="modalRef">
      <button (click)="modalRef.close(false)">{{ data.cancelText }}</button>
      <button (click)="modalRef.close(true)">{{ data.okText }}</button>
    </ng-template>
  `,
})
export class ConfirmModalComponent extends asModal<ConfirmModalData, boolean>()
  implements ComponentModal {
  @ViewChild('title', { static: true }) title!: TemplateRef<
    ModalTemplateContext<AnyModal>
  >;
  @ViewChild('footer', { static: true }) footer!: TemplateRef<
    ModalTemplateContext<AnyModal>
  >;

  modalRef!: ModalRef<
    ConfirmModalComponent,
    ComponentModalExtras<ConfirmModalComponent>
  >;
  defaultData?: ConfirmModalData;
  data?: ConfirmModalData;

  setDefaultData(data?: InferModalData<ConfirmModalComponent>): void {
    this.defaultData = data;
    this.data = { ...this.defaultData, ...this.data };
  }

  setModalRef(
    modalRef: ModalRef<
      ConfirmModalComponent,
      ComponentModalExtras<ConfirmModalComponent>
    >,
  ): void {
    this.modalRef = modalRef;
    this.data = { ...this.defaultData, ...modalRef.getData() };
  }

  updateModalData(data: InferModalData<ConfirmModalComponent>): void {
    this.data = { ...this.defaultData, ...data };
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
})
export class ConfirmModalModule {}

// tslint:disable-next-line: no-empty-interface
export interface ConfirmModalStrategyOptions extends ConfirmModalData {}

export class ConfirmModalRenderingRef
  implements ComponentModalRenderingRef<ConfirmModalComponent> {
  constructor(
    private renderingRef: ComponentModalRenderingRef<ConfirmModalComponent>,
  ) {}

  getModalOptions(): ModalOptions<ConfirmModalComponent> {
    const component = this.renderingRef.getExtras().getComponent();
    return {
      title: component.title,
      footer: component.footer,
    };
  }

  updateData(data?: ConfirmModalData): void {
    this.renderingRef.updateData(data);
  }

  getExtras(): ComponentModalExtras<ConfirmModalComponent> {
    return this.renderingRef.getExtras();
  }

  dispose(): void {
    // Refs cleanup requires assignment to `undefined`
    // tslint:disable: no-non-null-assertion

    this.renderingRef.dispose();
    this.renderingRef = undefined!;

    // tslint:enable: no-non-null-assertion
  }
}

export class ConfirmModalStrategy extends ComponentModalStrategy<
  ConfirmModalComponent
> {
  constructor(private opts?: ConfirmModalStrategyOptions) {
    super(ConfirmModalComponent);
  }

  render(
    vcr: ViewContainerRef,
    modalRef: ModalRef<
      ConfirmModalComponent,
      ComponentModalExtras<ConfirmModalComponent>
    >,
  ) {
    const renderingRef = super.render(vcr, modalRef);

    renderingRef
      .getExtras()
      .getComponent()
      .setDefaultData(this.opts);

    return new ConfirmModalRenderingRef(renderingRef);
  }
}
