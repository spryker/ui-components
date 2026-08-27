import {
    ChangeDetectorRef,
    ComponentRef,
    StaticProvider,
    NgModuleRef,
    Type,
    ViewContainerRef,
    Injector,
} from '@angular/core';
import { ComponentFactoryResolver, ReflectedComponentFactory } from '@spryker/utils';

import { AnyModal, ModalRef, InferModalData, ModalRenderingRef, ModalStrategy } from '../types';

export interface ComponentModal extends AnyModal {
    setModalRef(modalRef: ModalRef<this, ComponentModalExtras<this>>): void;
    updateModalData(data: InferModalData<this>): void;
}

export interface ComponentModalExtras<T extends ComponentModal> {
    getComponentRef(): ComponentRef<T>;
    getComponent(): T;
}

export interface ComponentModalRenderingRef<T extends ComponentModal> extends ModalRenderingRef<
    T,
    ComponentModalExtras<T>
> {}

class ComponentModalRenderingRefImpl<T extends ComponentModal> implements ComponentModalRenderingRef<T> {
    constructor(private componentRef: ComponentRef<T>) {}

    getComponentRef(): ComponentRef<T> {
        return this.componentRef;
    }

    getComponent(): T {
        return this.componentRef.instance;
    }

    updateData(data: InferModalData<T>): void {
        this.componentRef.instance.updateModalData(data);
        // `ComponentRef.changeDetectorRef` is a `ViewRef` over the *host root* LView, not the
        // component's own, so its `detectChanges()` is a no-op on an `OnPush` component once the
        // view has been checked once. Mark the component's own view instead.
        this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }

    getExtras(): ComponentModalExtras<T> {
        return this;
    }

    dispose(): void {
        // Refs cleanup requires assignment to `undefined`
        /* eslint-disable @typescript-eslint/no-non-null-assertion */

        this.componentRef.destroy();
        this.componentRef = undefined!;

        /* eslint-enable @typescript-eslint/no-non-null-assertion */
    }
}

export interface ComponentModalStrategyOptions {
    providers?: StaticProvider[];
    projectableNodes?: any[][];
    /**
     * Angular removed `ComponentFactoryResolver` in v22. The option is kept, retyped to the
     * structural {@link ComponentFactoryResolver} from `@spryker/utils`, and is still honoured
     * when supplied — Angular's own resolver satisfies that interface on Angular 20 and 21.
     * When it is absent the strategy creates the component directly.
     */
    componentFactoryResolver?: ComponentFactoryResolver;
    ngModule?: NgModuleRef<any>;
}

export class ComponentModalStrategy<T extends ComponentModal> implements ModalStrategy<T, ComponentModalExtras<T>> {
    constructor(
        private component: Type<T>,
        private options?: ComponentModalStrategyOptions,
    ) {}

    render(vcr: ViewContainerRef, modalRef: ModalRef<T, ComponentModalExtras<T>>): ComponentModalRenderingRef<T> {
        const injector = Injector.create({
            name: `ComponentModalInjector_${this.component.name}`,
            parent: vcr.injector,
            providers: [...(this.options?.providers ?? []), { provide: ModalRef, useValue: modalRef }],
        });

        const componentFactory =
            this.options?.componentFactoryResolver?.resolveComponentFactory(this.component) ??
            new ReflectedComponentFactory(this.component);

        const componentRef = componentFactory.create(
            injector,
            this.options?.projectableNodes,
            undefined,
            this.options?.ngModule,
        );

        componentRef.instance.setModalRef(modalRef);
        // `ComponentRef.changeDetectorRef` is a `ViewRef` over the *host root* LView, not the
        // component's own, so its `detectChanges()` is a no-op on an `OnPush` component once the
        // view has been checked once. Mark the component's own view instead.
        componentRef.injector.get(ChangeDetectorRef).markForCheck();

        vcr.insert(componentRef.hostView);

        return new ComponentModalRenderingRefImpl(componentRef);
    }
}
