import { TemplateRef } from '@angular/core';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import { ModalTemplateContext, AnyModal } from '../../types';

export interface ConfirmModalStrategyOptions extends ConfirmModalData {}

export interface ConfirmModalData {
    title?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    description?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    icon?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    okText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    okType?: string;
    okVariant?: ButtonVariant;
    okSize?: ButtonSize;
    cancelText?: string | TemplateRef<ModalTemplateContext<AnyModal>>;
    cancelType?: string;
    cancelVariant?: ButtonVariant;
    cancelSize?: ButtonSize;
    class?: string;
}
