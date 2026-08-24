import {
    ChangeDetectionStrategy,
    Component,
    InjectionToken,
    NgModule,
    ViewChild,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableConfig } from '../table/table';
import { TableFeatureLoaderService } from './table-feature-loader.service';
import { TableFeaturesRegistryToken } from './tokens';
import { ModuleWithFeature } from './types';

/**
 * Declared by the feature module below and by nothing else — the whole point of this spec is that
 * a feature component reaches providers that only its own lazily created `NgModuleRef` has.
 */
const FEATURE_SCOPED = new InjectionToken<string>('TableFeatureLoaderScopedToken');

const UNRESOLVED = '(not resolved)';

@Component({
    standalone: false,
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'spy-scoped-feature',
    template: ``,
})
class ScopedFeatureComponent extends TableFeatureComponent {
    scopedValue = inject(FEATURE_SCOPED, { optional: true }) ?? UNRESOLVED;
}

@NgModule({
    declarations: [ScopedFeatureComponent],
    exports: [ScopedFeatureComponent],
    providers: [{ provide: FEATURE_SCOPED, useValue: 'provided-by-the-feature-module' }],
})
class ScopedFeatureModule implements ModuleWithFeature {
    featureComponent = ScopedFeatureComponent;
}

@Component({
    standalone: false,
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'spy-feature-loader-host',
    template: `<ng-container #anchor></ng-container>`,
})
class FeatureLoaderHostComponent {
    @ViewChild('anchor', { read: ViewContainerRef, static: true }) vcr!: ViewContainerRef;
}

describe('TableFeatureLoaderService', () => {
    let service: TableFeatureLoaderService;
    let vcr: ViewContainerRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FeatureLoaderHostComponent],
            providers: [
                {
                    provide: TableFeaturesRegistryToken,
                    useValue: {
                        scopedFeature: () => Promise.resolve(ScopedFeatureModule),
                    },
                    multi: true,
                },
            ],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(TableFeatureLoaderService);

        const fixture = TestBed.createComponent(FeatureLoaderHostComponent);

        fixture.detectChanges();
        vcr = fixture.componentInstance.vcr;
    });

    it('should return an empty record when the config enables no registered feature', async () => {
        await expect(firstValueFrom(service.loadFactoriesFor({} as TableConfig))).resolves.toEqual({});
    });

    it('should skip a registered feature the config disables', async () => {
        const factories = await firstValueFrom(
            service.loadFactoriesFor({ scopedFeature: { enabled: false } } as unknown as TableConfig),
        );

        expect(factories).toEqual({});
    });

    it('should resolve a factory for the module`s own featureComponent', async () => {
        const factories = await firstValueFrom(
            service.loadFactoriesFor({ scopedFeature: {} } as unknown as TableConfig),
        );

        expect(Object.keys(factories)).toEqual(['scopedFeature']);
        expect(factories.scopedFeature.componentType).toBe(ScopedFeatureComponent);
        expect(factories.scopedFeature.selector).toBe('spy-scoped-feature');
    });

    /**
     * THE regression this phase risks. `TableComponent` creates every feature with
     * `featureFactory.create(this.vcr.injector)` and **no** environment injector, and the removed
     * `moduleRef.componentFactoryResolver` is what used to keep the feature module's providers
     * reachable. If the shim loses that binding, every extension feature module that declares
     * providers of its own throws `NullInjectorError` at runtime — and compiles perfectly.
     */
    it('should let a feature component resolve a module-scoped provider through create(vcr.injector)', async () => {
        // Negative control: the call site's own injector cannot see the feature module's provider.
        expect(vcr.injector.get(FEATURE_SCOPED, UNRESOLVED)).toBe(UNRESOLVED);

        const factories = await firstValueFrom(
            service.loadFactoriesFor({ scopedFeature: {} } as unknown as TableConfig),
        );

        // Exactly the call `table.component.ts` makes — one argument, no environment injector.
        const featureRef = factories.scopedFeature.create(vcr.injector);

        expect(featureRef.instance).toBeInstanceOf(ScopedFeatureComponent);
        expect((featureRef.instance as ScopedFeatureComponent).scopedValue).toBe('provided-by-the-feature-module');

        featureRef.destroy();
    });

    it('should reuse one module ref across repeated loads and destroy it on teardown', async () => {
        const first = await firstValueFrom(service.loadFactoriesFor({ scopedFeature: {} } as unknown as TableConfig));
        const second = await firstValueFrom(service.loadFactoriesFor({ scopedFeature: {} } as unknown as TableConfig));

        expect(second.scopedFeature).toBe(first.scopedFeature);

        const featureRef = first.scopedFeature.create(vcr.injector);

        expect((featureRef.instance as ScopedFeatureComponent).scopedValue).toBe('provided-by-the-feature-module');

        featureRef.destroy();
        service.ngOnDestroy();

        // The module ref is gone, so a factory created after teardown resolves nothing.
        await expect(
            firstValueFrom(service.loadFactoriesFor({ scopedFeature: {} } as unknown as TableConfig)),
        ).resolves.toEqual({});
    });
});
