import {
    ComponentRef,
    EnvironmentInjector,
    Injector,
    NgModuleRef,
    Type,
    createComponent,
    reflectComponentType,
} from '@angular/core';

import {
    ComponentFactory,
    ComponentFactoryBindings,
    ComponentFactoryDirectives,
    ComponentFactoryEnvironment,
    ComponentFactoryInput,
    ComponentFactoryOutput,
    ComponentFactoryResolver,
} from './types';

/**
 * Narrows an {@link ComponentFactoryEnvironment} to an `EnvironmentInjector`.
 *
 * Mirrors what Angular's own `createRootViewInjector()` does with the fourth argument of
 * `ComponentFactory.create()`.
 */
function toEnvironmentInjector(environment: ComponentFactoryEnvironment): EnvironmentInjector {
    return environment instanceof EnvironmentInjector ? environment : environment.injector;
}

/**
 * Replacement for Angular's `ComponentFactory`, which is removed in Angular 22.
 *
 * Metadata comes from `reflectComponentType()`; construction goes through `createComponent()`.
 *
 * **The factory is module-bound, and that is the whole point of it.**
 * `moduleRef.componentFactoryResolver.resolveComponentFactory(c)` used to return a factory tied
 * to that `NgModuleRef`, so `factory.create(someOtherInjector)` — with no fourth argument — still
 * resolved providers declared by that module. Callers rely on this: `@spryker/table` creates
 * every lazily loaded feature component that way. Pass the owning `NgModuleRef` (or its
 * `EnvironmentInjector`) to the constructor to keep that behaviour.
 *
 * `create()` picks the environment injector in this order:
 *
 * 1. the explicit `environmentInjector` argument,
 * 2. the environment this factory was bound to at construction,
 * 3. `injector.get(EnvironmentInjector)`.
 *
 * **Known fidelity gap:** the removed API's `rootSelectorOrNode` also accepted a CSS selector
 * string, which it looked up in the document. `createComponent()` takes a `hostElement: Element`
 * only, and the shim does not emulate the lookup — passing a string throws.
 */
export class ReflectedComponentFactory<C> implements ComponentFactory<C> {
    readonly selector: string;
    readonly componentType: Type<C>;
    readonly ngContentSelectors: string[];
    readonly inputs: ComponentFactoryInput[];
    readonly outputs: ComponentFactoryOutput[];

    /**
     * @param component the component type to create.
     * @param environment the `NgModuleRef` / `EnvironmentInjector` this factory is bound to.
     *     Omit it for an unbound factory, which falls back to the caller's injector.
     */
    constructor(
        component: Type<C>,
        private environment?: ComponentFactoryEnvironment,
    ) {
        const mirror = reflectComponentType(component);

        if (!mirror) {
            throw new Error(
                `ReflectedComponentFactory: ${component.name ?? component} is not a component. ` +
                    'Only classes decorated with @Component can be created by a component factory.',
            );
        }

        this.selector = mirror.selector;
        this.componentType = mirror.type;
        this.ngContentSelectors = [...mirror.ngContentSelectors];
        this.inputs = mirror.inputs.map((input) => ({ ...input }));
        this.outputs = mirror.outputs.map((output) => ({ ...output }));
    }

    create(
        injector: Injector,
        projectableNodes?: any[][],
        rootSelectorOrNode?: any,
        environmentInjector?: ComponentFactoryEnvironment,
        directives?: ComponentFactoryDirectives,
        bindings?: ComponentFactoryBindings,
    ): ComponentRef<C> {
        if (typeof rootSelectorOrNode === 'string') {
            throw new Error(
                'ReflectedComponentFactory: a CSS selector as `rootSelectorOrNode` is not supported. ' +
                    'Angular 22 `createComponent()` takes a host `Element`; pass the element itself.',
            );
        }

        const environment = environmentInjector ?? this.environment;

        return createComponent(this.componentType, {
            environmentInjector: environment ? toEnvironmentInjector(environment) : injector.get(EnvironmentInjector),
            elementInjector: injector,
            hostElement: rootSelectorOrNode as Element | undefined,
            projectableNodes: projectableNodes as Node[][] | undefined,
            directives,
            bindings,
        });
    }
}

/**
 * Replacement for Angular's `ComponentFactoryResolver`, which is removed in Angular 22.
 *
 * Bind it to the `NgModuleRef` whose providers the created components must see — that is what
 * `moduleRef.componentFactoryResolver` did — and every factory it hands out inherits that
 * binding.
 */
export class ReflectedComponentFactoryResolver implements ComponentFactoryResolver {
    /**
     * @param environment the `NgModuleRef` / `EnvironmentInjector` every resolved factory is
     *     bound to. Omit it for unbound factories.
     */
    constructor(private environment?: ComponentFactoryEnvironment) {}

    resolveComponentFactory<C>(component: Type<C>): ComponentFactory<C> {
        return new ReflectedComponentFactory(component, this.environment);
    }
}

/**
 * Builds a {@link ComponentFactoryResolver} bound to `moduleRef`, as a drop-in for the removed
 * `moduleRef.componentFactoryResolver`.
 */
export function componentFactoryResolverFor(moduleRef: NgModuleRef<unknown>): ComponentFactoryResolver {
    return new ReflectedComponentFactoryResolver(moduleRef);
}
