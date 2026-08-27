import {
    ChangeDetectionStrategy,
    Component,
    EnvironmentInjector,
    EventEmitter,
    InjectionToken,
    Injector,
    Input,
    NgModule,
    Output,
    Pipe,
    PipeTransform,
    createEnvironmentInjector,
    createNgModule,
    inject,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
    ReflectedComponentFactory,
    ReflectedComponentFactoryResolver,
    componentFactoryResolverFor,
} from './component-factory';

/**
 * Every assertion below reads this token off the created component instance. Which value comes
 * back is what "which injector did `create()` resolve providers from" means in practice.
 *
 * The TestBed root deliberately does **not** provide it: Angular chains the injector passed to
 * `create()` in front of the environment injector, so a root-provided value would mask every
 * environment branch and the test would prove nothing.
 */
const ORIGIN = new InjectionToken<string>('ComponentFactoryShimOrigin');

const UNPROVIDED = '(none)';

@Component({
    standalone: false,
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'spy-shim-target',
    template: `
        <ng-content></ng-content>
        <ng-content select="[slot-b]"></ng-content>
    `,
})
class ShimTargetComponent {
    // Aliased on purpose: `templateName` and `propName` are separate fields of the mirrored
    // metadata, and an unaliased binding cannot tell the two apart.
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('aliasedInput') input = '';
    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output('aliasedOutput') output = new EventEmitter<string>();

    origin = inject(ORIGIN, { optional: true }) ?? UNPROVIDED;
}

/**
 * Stands in for a lazily loaded `@spryker/table` feature module: it declares providers of its own
 * and names the component that has to see them.
 */
@NgModule({
    providers: [{ provide: ORIGIN, useValue: 'feature-module' }],
})
class ShimFeatureModule {
    featureComponent = ShimTargetComponent;
}

@Pipe({ standalone: false, name: 'spyShimNotAComponent' })
class NotAComponentPipe implements PipeTransform {
    transform(value: unknown): unknown {
        return value;
    }
}

const configure = () =>
    TestBed.configureTestingModule({
        declarations: [ShimTargetComponent],
        teardown: { destroyAfterEach: false },
    });

/** An injector that resolves nothing of its own, so only the environment branch can answer. */
const callerInjector = () => Injector.create({ parent: TestBed.inject(Injector), providers: [] });

const askedForEnvironmentInjector = (spy: jest.SpyInstance) =>
    spy.mock.calls.some((call) => call[0] === EnvironmentInjector);

describe('ReflectedComponentFactory', () => {
    beforeEach(configure);

    describe('metadata', () => {
        it('should mirror the full ComponentFactory surface', () => {
            const factory = new ReflectedComponentFactory(ShimTargetComponent);

            expect(factory.selector).toBe('spy-shim-target');
            expect(factory.componentType).toBe(ShimTargetComponent);
            expect(factory.ngContentSelectors).toEqual(['*', '[slot-b]']);
            expect(factory.inputs).toEqual([
                expect.objectContaining({ propName: 'input', templateName: 'aliasedInput', isSignal: false }),
            ]);
            expect(factory.outputs).toEqual([{ propName: 'output', templateName: 'aliasedOutput' }]);
        });

        it('should throw for a type that is not a component', () => {
            expect(() => new ReflectedComponentFactory(NotAComponentPipe as never)).toThrow(/is not a component/);
        });
    });

    describe('create() environment injector resolution', () => {
        /**
         * Branch 1 — an explicit fourth argument wins over everything, including the environment
         * the factory was bound to at construction.
         */
        it('should prefer the explicit environmentInjector argument over the bound one', () => {
            const moduleRef = createNgModule(ShimFeatureModule, TestBed.inject(Injector));
            const explicit = createEnvironmentInjector(
                [{ provide: ORIGIN, useValue: 'explicit-argument' }],
                TestBed.inject(EnvironmentInjector),
            );
            const factory = new ReflectedComponentFactory(ShimTargetComponent, moduleRef);
            const componentRef = factory.create(callerInjector(), undefined, undefined, explicit);

            expect(componentRef.instance.origin).toBe('explicit-argument');

            componentRef.destroy();
            moduleRef.destroy();
        });

        /**
         * Branch 2 — THE load-bearing one. `@spryker/table` calls `create(this.vcr.injector)` with
         * no fourth argument, and the feature component still has to reach providers declared by
         * the lazily created feature `NgModuleRef` the factory is bound to. Break this and every
         * extension feature module with providers of its own throws `NullInjectorError`.
         */
        it('should fall back to the bound NgModuleRef when no environmentInjector is passed', () => {
            const moduleRef = createNgModule(ShimFeatureModule, TestBed.inject(Injector));
            const factory = new ReflectedComponentFactory(ShimTargetComponent, moduleRef);
            const caller = callerInjector();
            const getSpy = jest.spyOn(caller, 'get');

            // The caller cannot answer for ORIGIN — only the bound module can.
            expect(caller.get(ORIGIN, UNPROVIDED)).toBe(UNPROVIDED);

            const componentRef = factory.create(caller);

            expect(componentRef.instance.origin).toBe('feature-module');
            // The bound environment is used directly; the caller is never asked for one.
            expect(askedForEnvironmentInjector(getSpy)).toBe(false);

            componentRef.destroy();
            moduleRef.destroy();
        });

        it('should accept a bare EnvironmentInjector as the bound environment', () => {
            const bound = createEnvironmentInjector(
                [{ provide: ORIGIN, useValue: 'bound-environment-injector' }],
                TestBed.inject(EnvironmentInjector),
            );
            const factory = new ReflectedComponentFactory(ShimTargetComponent, bound);
            const componentRef = factory.create(callerInjector());

            expect(componentRef.instance.origin).toBe('bound-environment-injector');

            componentRef.destroy();
        });

        /** Branch 3 — unbound factory, no explicit argument: the caller's own environment. */
        it('should fall back to injector.get(EnvironmentInjector) when it is bound to nothing', () => {
            const callerEnvironment = createEnvironmentInjector(
                [{ provide: ORIGIN, useValue: 'caller-environment' }],
                TestBed.inject(EnvironmentInjector),
            );
            const caller = Injector.create({ parent: callerEnvironment, providers: [] });
            const getSpy = jest.spyOn(caller, 'get');
            const factory = new ReflectedComponentFactory(ShimTargetComponent);
            const componentRef = factory.create(caller);

            expect(askedForEnvironmentInjector(getSpy)).toBe(true);
            expect(componentRef.instance.origin).toBe('caller-environment');

            componentRef.destroy();
        });

        it('should resolve providers from the passed injector before the bound environment', () => {
            const moduleRef = createNgModule(ShimFeatureModule, TestBed.inject(Injector));
            const elementInjector = Injector.create({
                parent: TestBed.inject(Injector),
                providers: [{ provide: ORIGIN, useValue: 'element-injector' }],
            });
            const factory = new ReflectedComponentFactory(ShimTargetComponent, moduleRef);
            const componentRef = factory.create(elementInjector);

            expect(componentRef.instance.origin).toBe('element-injector');

            componentRef.destroy();
            moduleRef.destroy();
        });
    });

    describe('create() host element and projection', () => {
        it('should render into a provided host Element', () => {
            const host = document.createElement('div');
            const factory = new ReflectedComponentFactory(ShimTargetComponent);
            const componentRef = factory.create(callerInjector(), undefined, host);

            expect(componentRef.location.nativeElement).toBe(host);

            componentRef.destroy();
        });

        it('should project the nodes it is given', () => {
            const projected = document.createElement('span');

            projected.textContent = 'projected';

            const factory = new ReflectedComponentFactory(ShimTargetComponent);
            const componentRef = factory.create(callerInjector(), [[projected], []]);

            componentRef.changeDetectorRef.detectChanges();

            expect((componentRef.location.nativeElement as HTMLElement).textContent).toContain('projected');

            componentRef.destroy();
        });

        /**
         * Documented fidelity gap: the removed API also accepted a CSS selector string, which it
         * looked up in the document. `createComponent()` takes an `Element`, and the shim does not
         * emulate the lookup.
         */
        it('should reject a CSS selector as rootSelectorOrNode', () => {
            const factory = new ReflectedComponentFactory(ShimTargetComponent);

            expect(() => factory.create(callerInjector(), undefined, '#somewhere')).toThrow(
                /CSS selector as `rootSelectorOrNode` is not supported/,
            );
        });
    });
});

describe('ReflectedComponentFactoryResolver', () => {
    beforeEach(configure);

    it('should hand out factories bound to the environment it captured', () => {
        const moduleRef = createNgModule(ShimFeatureModule, TestBed.inject(Injector));
        const resolver = new ReflectedComponentFactoryResolver(moduleRef);
        const componentRef = resolver.resolveComponentFactory(ShimTargetComponent).create(callerInjector());

        expect(componentRef.instance.origin).toBe('feature-module');

        componentRef.destroy();
        moduleRef.destroy();
    });

    it('should hand out unbound factories when it captured nothing', () => {
        const resolver = new ReflectedComponentFactoryResolver();
        const componentRef = resolver.resolveComponentFactory(ShimTargetComponent).create(callerInjector());

        expect(componentRef.instance.origin).toBe(UNPROVIDED);

        componentRef.destroy();
    });

    it('should build a module-bound resolver via componentFactoryResolverFor()', () => {
        const moduleRef = createNgModule(ShimFeatureModule, TestBed.inject(Injector));
        const factory = componentFactoryResolverFor(moduleRef).resolveComponentFactory(ShimTargetComponent);
        const componentRef = factory.create(callerInjector());

        expect(factory.componentType).toBe(ShimTargetComponent);
        expect(componentRef.instance.origin).toBe('feature-module');

        componentRef.destroy();
        moduleRef.destroy();
    });
});
