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

export class CacheStoragePersistanceAdapter implements CacheStorage {
  static ManifestId = 'Persistence_Strategies_Manifest';
  static DefaultNamespace = 'Default_Persistence_Strategies_Namespace';
  private manifest$: Observable<
    Map<string, ManifestStrategyConfig[]> | undefined
  >;
  private persistenceStrategy: PersistenceStrategy;

  constructor(persistenceStrategy: PersistenceStrategy) {
    this.persistenceStrategy = persistenceStrategy;
    this.manifest$ = this.persistenceStrategy.retrieve(
      CacheStoragePersistanceAdapter.ManifestId,
    );
  }

  has(id: CacheId, namespace?: string): Observable<boolean> {
    return this.manifest$.pipe(
      map((manifest) => {
        if (!manifest) {
          return false;
        }

        const { name, strategyNamespace } = this.getManifestData(
          manifest,
          id,
          namespace,
        );

        return (
          manifest
            .get(strategyNamespace)
            ?.some((nameSpaceData) => nameSpaceData.name === name) ?? false
        );
      }),
    );
  }

  get(id: CacheId, namespace?: string): Observable<CacheEntry | undefined> {
    return this.manifest$.pipe(
      switchMap((manifest) => {
        if (!manifest) {
          return of(undefined);
        }

        const { name } = this.getManifestData(manifest, id, namespace);

        return this.persistenceStrategy.retrieve<CacheEntry>(name);
      }),
    );
  }

  set(id: CacheId, data: CacheEntry, namespace?: string): Observable<void> {
    return this.manifest$.pipe(
      switchMap((manifest) => {
        const currentManifest =
          manifest ?? new Map<string, ManifestStrategyConfig[]>();
        const { name, strategyNamespace, configs } = this.getManifestData(
          currentManifest,
          id,
          namespace,
        );

        currentManifest.set(strategyNamespace, [
          ...configs,
          { id: id.serialize(), name },
        ]);

        return forkJoin(
          this.persistenceStrategy.save(name, data),
          this.persistenceStrategy.save(
            CacheStoragePersistanceAdapter.ManifestId,
            manifest,
          ),
        );
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

        const { name, strategyNamespace, configs } = this.getManifestData(
          manifest,
          id,
          namespace,
        );

        manifest.set(
          strategyNamespace,
          configs.filter((config) => config.id !== id.serialize()),
        );

        return forkJoin(
          this.persistenceStrategy.remove(name),
          this.persistenceStrategy.save(
            CacheStoragePersistanceAdapter.ManifestId,
            manifest,
          ),
        );
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
          configs?.map((config) =>
            this.persistenceStrategy.remove(config.name),
          ) ?? [];

        if (namespace) {
          const configs = manifest.get(namespace);
          manifest.delete(namespace);

          return forkJoin(
            clearStrategies(configs),
            this.persistenceStrategy.save(
              CacheStoragePersistanceAdapter.ManifestId,
              manifest,
            ),
          );
        }

        const strategyClearObservables$ = [...manifest.values()].reduce(
          (accumulator: Observable<void>[], configs) => {
            return [...accumulator, ...clearStrategies(configs)];
          },
          [],
        );
        manifest.clear();

        return forkJoin(
          ...strategyClearObservables$,
          this.persistenceStrategy.save(
            CacheStoragePersistanceAdapter.ManifestId,
            manifest,
          ),
        );
      }),
      mapTo(void 0),
    );
  }

  private getManifestData(
    manifest: Map<string, ManifestStrategyConfig[]>,
    id: CacheId,
    namespace?: string,
  ): ManifestData {
    const strategyNamespace =
      namespace ?? CacheStoragePersistanceAdapter.DefaultNamespace;
    const name = `${strategyNamespace}.${id.serialize()}`;
    const configs = manifest.get(strategyNamespace) ?? [];

    return { name, strategyNamespace, configs };
  }
}
