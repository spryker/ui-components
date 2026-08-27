import { Injectable, Injector, NgModuleRef, OnDestroy, Type, createNgModule, inject } from '@angular/core';
import { ComponentFactory, ReflectedComponentFactory } from '@spryker/utils';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs';
import { TableFeatureConfig } from '../table-config/types';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableConfig } from '../table/table';
import { TableFeaturesRegistryToken } from './tokens';
import { ModuleWithFeature, TableFeatureLoader, TableFeaturesRegistry } from './types';

@Injectable({ providedIn: 'root' })
export class TableFeatureLoaderService implements OnDestroy {
    protected featuresRegistries = inject(TableFeaturesRegistryToken, { optional: true });
    protected injector = inject(Injector);

    private featuresRegistry: TableFeaturesRegistry =
        this.featuresRegistries?.reduce(
            (acc, reg) => ({
                ...acc,
                ...reg,
            }),
            Object.create(null),
        ) ?? Object.create(null);

    private loadedFeatures = this.mapFeatures(this.featuresRegistry, (loader) =>
        this.loaderToObservable(loader).pipe(shareReplay({ bufferSize: 1, refCount: true })),
    );

    private featureModules = this.mapFeatures(this.loadedFeatures, (loadedFeature$) =>
        loadedFeature$.pipe(
            map((featureModule) => this.initFeatureModule(featureModule)),
            shareReplay({ bufferSize: 1, refCount: true }),
        ),
    );

    private featureModuleRefs: NgModuleRef<ModuleWithFeature>[] = [];

    private featureFactories = this.mapFeatures(this.featureModules, (featureModule$) =>
        featureModule$.pipe(
            map((featureModule) => this.resolveFeatureFactory(featureModule)),
            shareReplay({ bufferSize: 1, refCount: true }),
        ),
    );

    ngOnDestroy(): void {
        // Destroy all created module refs
        this.featureModuleRefs.forEach((featureModule) => featureModule.destroy());

        // Cleanup refs to modules
        this.featuresRegistries = [];
        this.featuresRegistry = this.loadedFeatures = this.featureModules = this.featureFactories = {};
    }

    loadFactoriesFor(config: TableConfig): Observable<Record<string, ComponentFactory<TableFeatureComponent>>> {
        const configNames = Object.keys(config);
        const featureNames = configNames.filter(
            (name) => name in this.featuresRegistry && (config[name] as TableFeatureConfig).enabled !== false,
        );

        if (featureNames.length === 0) {
            return of({});
        }

        const featureModules = featureNames.reduce(
            (acc, name) => ({
                ...acc,
                [name]: this.featureFactories[name],
            }),
            Object.create(null) as Record<string, Observable<ComponentFactory<TableFeatureComponent>>>,
        );

        return forkJoin(featureModules);
    }

    private loaderToObservable(loader: TableFeatureLoader): Observable<Type<ModuleWithFeature>> {
        return new Observable<Type<ModuleWithFeature>>((subscriber) => {
            const sub = from(loader()).subscribe(subscriber);
            return () => sub.unsubscribe();
        });
    }

    private initFeatureModule(moduleType: Type<ModuleWithFeature>): NgModuleRef<ModuleWithFeature> {
        // `createNgModule()` replaces `Compiler.compileModuleAndAllComponentsAsync()`, which is
        // removed in Angular 22. Feature modules are AOT-compiled, so no JIT compilation step is
        // needed to instantiate them — and none was ever needed to reach `featureComponent`.
        const moduleRef = createNgModule(moduleType, this.injector);

        // Store created module refs for future cleanup
        this.featureModuleRefs.push(moduleRef);

        return moduleRef;
    }

    private resolveFeatureFactory(
        moduleRef: NgModuleRef<ModuleWithFeature>,
    ): ComponentFactory<TableFeatureComponent<TableFeatureConfig>> {
        // Bound to `moduleRef`, exactly as the removed `moduleRef.componentFactoryResolver` was:
        // `TableComponent` calls `create(this.vcr.injector)` with no environment injector, and the
        // feature component must still resolve providers declared by its own feature module.
        return new ReflectedComponentFactory(moduleRef.instance.featureComponent, moduleRef);
    }

    private mapFeatures<T, R>(features: Record<string, T>, mapFn: (feature: T) => R): Record<string, R> {
        return Object.fromEntries(Object.entries(features).map(([name, feature]) => [name, mapFn(feature)]));
    }
}
