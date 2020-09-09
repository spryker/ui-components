import {
  ComponentRef,
  StaticProvider,
  ComponentFactoryResolver,
  NgModuleRef,
  Type,
  ViewContainerRef,
  Injector,
} from '@angular/core';

import {
  AnyModal,
  ModalRef,
  InferModalData,
  ModalRenderingRef,
  ModalStrategy,
} from '../types';

export interface ComponentModal extends AnyModal {
  setModalRef(modalRef: ModalRef<this, ComponentModalExtras<this>>): void;
  updateModalData(data: InferModalData<this>): void;
}

export interface ComponentModalExtras<T extends ComponentModal> {
  getComponentRef(): ComponentRef<T>;
  getComponent(): T;
}

export interface ComponentModalRenderingRef<T extends ComponentModal>
  extends ModalRenderingRef<T, ComponentModalExtras<T>> {}

class ComponentModalRenderingRefImpl<T extends ComponentModal>
  implements ComponentModalRenderingRef<T> {
  constructor(private componentRef: ComponentRef<T>) {}

  getComponentRef() {
    return this.componentRef;
  }

  getComponent() {
    return this.componentRef.instance;
  }

  updateData(data: InferModalData<T>): void {
    this.componentRef.instance.updateModalData(data);
    this.componentRef.changeDetectorRef.detectChanges();
  }

  getExtras(): ComponentModalExtras<T> {
    return this;
  }

  dispose(): void {
    // Refs cleanup requires assignment to `undefined`
    // tslint:disable: no-non-null-assertion

    this.componentRef.destroy();
    this.componentRef = undefined!;

    // tslint:enable: no-non-null-assertion
  }
}

export interface ComponentModalStrategyOptions {
  providers?: StaticProvider[];
  projectableNodes?: any[][];
  componentFactoryResolver?: ComponentFactoryResolver;
  ngModule?: NgModuleRef<any>;
}

export class ComponentModalStrategy<T extends ComponentModal>
  implements ModalStrategy<T, ComponentModalExtras<T>> {
  constructor(
    private component: Type<T>,
    private options?: ComponentModalStrategyOptions,
  ) {}

  render(
    vcr: ViewContainerRef,
    modalRef: ModalRef<T, ComponentModalExtras<T>>,
  ): ComponentModalRenderingRef<T> {
    const injector = Injector.create({
      name: `ComponentModalInjector_${this.component.name}`,
      parent: vcr.injector,
      providers: [
        ...(this.options?.providers ?? []),
        { provide: ModalRef, useValue: modalRef },
      ],
    });

    const componentFactoryResolver =
      this.options?.componentFactoryResolver ??
      vcr.injector.get(ComponentFactoryResolver);

    const componentFactory = componentFactoryResolver.resolveComponentFactory(
      this.component,
    );

    const componentRef = componentFactory.create(
      injector,
      this.options?.projectableNodes,
      undefined,
      this.options?.ngModule,
    );

    componentRef.instance.setModalRef(modalRef);
    componentRef.changeDetectorRef.detectChanges();

    vcr.insert(componentRef.hostView);

    return new ComponentModalRenderingRefImpl(componentRef);
  }
}
