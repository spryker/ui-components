import { TemplateRef } from '@angular/core';
import { ModalTemplateContext, AnyModal } from '../../types';
import { ButtonVariant } from '@spryker/button';

export interface ConfirmModalStrategyOptions extends ConfirmModalData {}

export interface ConfirmModalData {
  title?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  description?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  icon?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  okText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  okType?: string;
  okButtonVariant?: ButtonVariant;
  cancelText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
  cancelType?: string;
  class?: string;
}
