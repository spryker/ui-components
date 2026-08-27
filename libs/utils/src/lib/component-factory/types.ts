import { ComponentRef, EnvironmentInjector, Injector, NgModuleRef, Type, createComponent } from '@angular/core';

/**
 * The options object `createComponent()` accepts.
 *
 * Used to derive the two parameter types the shim cannot import by name:
 * `DirectiveWithBindings` is not part of `@angular/core`'s public export list, and `Binding`
 * only became public in Angular 20. Deriving them keeps the shim compiling unchanged across
 * Angular 20, 21 and 22.
 */
type CreateComponentOptions = Parameters<typeof createComponent>[1];

/** Directives applied to the dynamically created component, as `createComponent()` accepts them. */
export type ComponentFactoryDirectives = NonNullable<CreateComponentOptions['directives']>;

/** Bindings applied to the dynamically created component, as `createComponent()` accepts them. */
export type ComponentFactoryBindings = NonNullable<CreateComponentOptions['bindings']>;

/**
 * An environment the created component resolves its providers from.
 *
 * Both forms are accepted for parity with Angular's own `ComponentFactory.create()`, whose
 * fourth parameter is `EnvironmentInjector | NgModuleRef<any>`.
 */
export type ComponentFactoryEnvironment = EnvironmentInjector | NgModuleRef<any>;

/** One entry of {@link ComponentFactory.inputs}. Shaped exactly like Angular's. */
export interface ComponentFactoryInput {
    propName: string;
    templateName: string;
    transform?: (value: any) => any;
    isSignal: boolean;
}

/** One entry of {@link ComponentFactory.outputs}. Shaped exactly like Angular's. */
export interface ComponentFactoryOutput {
    propName: string;
    templateName: string;
}

/**
 * Structural stand-in for Angular's `ComponentFactory`, which is removed in Angular 22.
 *
 * The member list is identical to the Angular 20 abstract class, so Angular's own
 * `ComponentFactory` is assignable to this interface for as long as it exists. That is what
 * lets `@spryker/modal` keep accepting a real `moduleRef.componentFactoryResolver` from a
 * consumer running on Angular 20 or 21.
 *
 * @see ReflectedComponentFactory for the implementation.
 */
export interface ComponentFactory<C> {
    /** The component's HTML selector. */
    readonly selector: string;

    /** The type of component the factory will create. */
    readonly componentType: Type<C>;

    /** Selector for all `<ng-content>` elements in the component. */
    readonly ngContentSelectors: string[];

    /** The inputs of the component. */
    readonly inputs: ComponentFactoryInput[];

    /** The outputs of the component. */
    readonly outputs: ComponentFactoryOutput[];

    /**
     * Creates a new component.
     *
     * `rootSelectorOrNode` accepts a DOM `Element` only. Angular's removed `ComponentFactory`
     * also accepted a CSS selector string; `createComponent()` does not, and the shim does not
     * emulate it — passing a string throws.
     */
    create(
        injector: Injector,
        projectableNodes?: any[][],
        rootSelectorOrNode?: any,
        environmentInjector?: ComponentFactoryEnvironment,
        directives?: ComponentFactoryDirectives,
        bindings?: ComponentFactoryBindings,
    ): ComponentRef<C>;
}

/**
 * Structural stand-in for Angular's `ComponentFactoryResolver`, which is removed in Angular 22.
 *
 * Angular's own resolver satisfies this interface, so a consumer still on Angular 20 or 21 can
 * pass `moduleRef.componentFactoryResolver` wherever one of these is expected.
 *
 * @see ReflectedComponentFactoryResolver for the implementation.
 */
export interface ComponentFactoryResolver {
    /** Retrieves the factory object that creates a component of the given type. */
    resolveComponentFactory<C>(component: Type<C>): ComponentFactory<C>;
}
