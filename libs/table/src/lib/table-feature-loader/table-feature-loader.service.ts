import {
    Compiler,
    ComponentFactory,
    Inject,
    Injectable,
    Injector,
    ModuleWithComponentFactories,
    NgModuleFactory,
    NgModuleRef,
    OnDestroy,
    Optional,
    Type,
} from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { TableFeatureConfig } from '../table-config';
import { TableFeatureComponent } from '../table-feature';
import { TableConfig } from '../table';
import { TableFeaturesRegistryToken } from './tokens';
import { ModuleWithFeature, TableFeatureLoader, TableFeaturesRegistry } from './types';

@Injectable({ providedIn: 'root' })
export class TableFeatureLoaderService implements OnDestroy {
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

    private compiledFeatures = this.mapFeatures(this.loadedFeatures, (loadedFeature$) =>
        loadedFeature$.pipe(
            switchMap((featureModule) => this.compileFeatureModule(featureModule)),
            shareReplay({ bufferSize: 1, refCount: true }),
        ),
    );

    private featureModules = this.mapFeatures(this.compiledFeatures, (compiledFeature$) =>
        compiledFeature$.pipe(
            map((compiledFeature) => this.initFeatureModule(compiledFeature.ngModuleFactory)),
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

    constructor(
        @Inject(TableFeaturesRegistryToken)
        @Optional()
        private featuresRegistries: InjectionTokenType<typeof TableFeaturesRegistryToken> | null,
        private compiler: Compiler,
        private injector: Injector,
    ) {}

    ngOnDestroy(): void {
        // Destroy all created module refs
        this.featureModuleRefs.forEach((featureModule) => featureModule.destroy());

        // Cleanup refs to modules
        this.featuresRegistries = [];
        this.featuresRegistry = this.compiledFeatures = this.featureModules = this.featureFactories = {};
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

    private compileFeatureModule(
        moduleType: Type<ModuleWithFeature>,
    ): Observable<ModuleWithComponentFactories<ModuleWithFeature>> {
        return from(this.compiler.compileModuleAndAllComponentsAsync(moduleType));
    }

    private initFeatureModule(moduleFactory: NgModuleFactory<ModuleWithFeature>): NgModuleRef<ModuleWithFeature> {
        const moduleRef = moduleFactory.create(this.injector);

        // Store created module refs for future cleanup
        this.featureModuleRefs.push(moduleRef);

        return moduleRef;
    }

    private resolveFeatureFactory(
        moduleRef: NgModuleRef<ModuleWithFeature>,
    ): ComponentFactory<TableFeatureComponent<TableFeatureConfig>> {
        return moduleRef.componentFactoryResolver.resolveComponentFactory(moduleRef.instance.featureComponent);
    }

    private mapFeatures<T, R>(features: Record<string, T>, mapFn: (feature: T) => R): Record<string, R> {
        return Object.fromEntries(Object.entries(features).map(([name, feature]) => [name, mapFn(feature)]));
    }
}
