import { Component, TemplateRef, ViewChild } from '@angular/core';

import { asModal } from '../../modal-base';
import {
  AnyModal,
  InferModalData,
  ModalRef,
  ModalTemplateContext,
} from '../../types';
import { ComponentModal, ComponentModalExtras } from '../component.strategy';
import { ConfirmModalData } from './types';

@Component({
  selector: 'spy-confirm-modal',
  templateUrl: './confirm.component.html',
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
  modalContext = {
    $implicit: this.modalRef,
  };

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
