import { ViewContainerRef } from '@angular/core';

import {
  ComponentModalExtras,
  ComponentModalRenderingRef,
  ComponentModalStrategy,
} from '../component.strategy';
import { ModalOptions, ModalRef } from '../../types';
import { ConfirmModalComponent } from './confirm.component';
import { ConfirmModalData, ConfirmModalStrategyOptions } from './types';

export class ConfirmModalRenderingRef
  implements ComponentModalRenderingRef<ConfirmModalComponent> {
  constructor(
    private renderingRef: ComponentModalRenderingRef<ConfirmModalComponent>,
  ) {}

  getModalOptions(): ModalOptions<ConfirmModalComponent> {
    const component = this.renderingRef.getExtras().getComponent();
    const defaultClassName = 'ant-modal--confirmation';
    const className = component.defaultData?.class
      ? `${component.defaultData?.class} ${defaultClassName}`
      : defaultClassName;

    return {
      class: className,
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
  ): ConfirmModalRenderingRef {
    const renderingRef = super.render(vcr, modalRef);

    renderingRef
      .getExtras()
      .getComponent()
      .setDefaultData(this.opts);

    return new ConfirmModalRenderingRef(renderingRef);
  }
}
