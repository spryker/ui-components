import { PersistenceStrategy } from '@spryker/persistence';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

import { CacheEntry, CacheId, CacheStorage } from './types';

interface ManifestStrategyConfig {
    id: string;
    name: string;
}

interface ManifestData {
    name: string;
    strategyNamespace: string;
    configs: ManifestStrategyConfig[];
}

/**
 * {@link CacheStorage} adapter for a {@link PersistenceStrategy}.
 */
export class CacheStoragePersistenceAdapter implements CacheStorage {
    static ManifestId = 'Persistence_Strategies_Manifest';
    static DefaultNamespace = 'Default_Persistence_Strategies_Namespace';
    private manifest$: Observable<Map<string, ManifestStrategyConfig[]> | undefined>;
    private persistenceStrategy: PersistenceStrategy;

    constructor(persistenceStrategy: PersistenceStrategy) {
        this.persistenceStrategy = persistenceStrategy;
        this.manifest$ = this.persistenceStrategy.retrieve(CacheStoragePersistenceAdapter.ManifestId);
    }

    has(id: CacheId, namespace?: string): Observable<boolean> {
        return this.manifest$.pipe(
            map((manifest) => {
                if (!manifest) {
                    return false;
                }

                const { name, strategyNamespace } = this.getManifestData(manifest, id, namespace);

                return manifest.get(strategyNamespace)?.some((nameSpaceData) => nameSpaceData.name === name) ?? false;
            }),
        );
    }

    get<T>(id: CacheId, namespace?: string): Observable<CacheEntry<T> | undefined> {
        return this.manifest$.pipe(
            switchMap((manifest) => {
                if (!manifest) {
                    return of(undefined);
                }

                const { name } = this.getManifestData(manifest, id, namespace);

                return this.persistenceStrategy.retrieve<CacheEntry<T>>(name);
            }),
        );
    }

    set(id: CacheId, data: CacheEntry, namespace?: string): Observable<void> {
        return this.manifest$.pipe(
            switchMap((manifest) => {
                const currentManifest = manifest ?? new Map<string, ManifestStrategyConfig[]>();
                const { name, strategyNamespace, configs } = this.getManifestData(currentManifest, id, namespace);

                currentManifest.set(strategyNamespace, [...configs, { id: id.serialize(), name }]);

                return forkJoin([this.persistenceStrategy.save(name, data), this.saveManifest(currentManifest)]);
            }),
            mapTo(void 0),
        );
    }

    remove(id: CacheId, namespace?: string): Observable<void> {
        return this.manifest$.pipe(
            switchMap((manifest) => {
                if (!manifest) {
                    return of(void 0);
                }

                const { name, strategyNamespace, configs } = this.getManifestData(manifest, id, namespace);
                const serializedId = id.serialize();

                manifest.set(
                    strategyNamespace,
                    configs.filter((config) => config.id !== serializedId),
                );

                return forkJoin([this.persistenceStrategy.remove(name), this.saveManifest(manifest)]);
            }),
            mapTo(void 0),
        );
    }

    clear(namespace?: string): Observable<void> {
        return this.manifest$.pipe(
            switchMap((manifest) => {
                if (!manifest) {
                    return of(void 0);
                }

                const clearStrategies = (configs?: ManifestStrategyConfig[]) =>
                    configs?.map((config) => this.persistenceStrategy.remove(config.name)) ?? [];

                if (namespace) {
                    const configs = manifest.get(namespace);
                    manifest.delete(namespace);

                    return forkJoin([...clearStrategies(configs), this.saveManifest(manifest)]);
                }

                const strategyClearObservables$ = clearStrategies([...manifest.values()].flat());
                manifest.clear();

                return forkJoin([...strategyClearObservables$, this.saveManifest(manifest)]);
            }),
            mapTo(void 0),
        );
    }

    private getManifestData(
        manifest: Map<string, ManifestStrategyConfig[]>,
        id: CacheId,
        namespace?: string,
    ): ManifestData {
        const strategyNamespace = namespace ?? CacheStoragePersistenceAdapter.DefaultNamespace;
        const name = this.getCacheName(strategyNamespace, id.serialize());
        const configs = manifest.get(strategyNamespace) ?? [];

        return { name, strategyNamespace, configs };
    }

    private saveManifest(manifest: Map<string, ManifestStrategyConfig[]>): Observable<void> {
        return this.persistenceStrategy.save(CacheStoragePersistenceAdapter.ManifestId, manifest);
    }

    private getCacheName(namespace: string, id: string): string {
        return `${namespace}.${id}`;
    }
}
