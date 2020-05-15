import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import {
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';

import { createLazyConditionLiteral } from '../lazy-condition/ast/literal';
import { LazyConditionService } from '../lazy-condition/lazy-condition.service';
import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { FeatureRecord } from './types';
import { LazyConditionNode } from '../lazy-condition/lazy-condition';

@Injectable()
export class TableFeaturesRendererService implements OnDestroy {
  private featureLocationStore = new TokenStore<
    [TableFeatureComponent[]],
    Observable<string[][][]>
  >(features =>
    combineLatest(
      features.map(feature =>
        feature.tplDirectives$.pipe(
          switchMap(tplDirectives =>
            combineLatest(
              tplDirectives.map(tplDirective => tplDirective.locations$),
            ),
          ),
          debounceTime(0),
        ),
      ),
    ).pipe(debounceTime(0), shareReplay({ bufferSize: 1, refCount: true })),
  );

  private featureConditionNodesStore = new TokenStore<
    [TableFeatureComponent[]],
    Observable<LazyConditionNode[][]>
  >(features =>
    combineLatest(
      features.map(feature =>
        feature.tplDirectives$.pipe(
          switchMap(tplDirectives =>
            combineLatest(
              tplDirectives.map(tplDirective =>
                tplDirective.condition$.pipe(
                  startWith(createLazyConditionLiteral(true)),
                ),
              ),
            ),
          ),
          debounceTime(0),
        ),
      ),
    ).pipe(debounceTime(0), shareReplay({ bufferSize: 1, refCount: true })),
  );

  private featureConditionsStore = new TokenStore<
    [Observable<LazyConditionNode[][]>, TableFeatureTplContext | undefined],
    Observable<boolean[][]>
  >((conditions, context) =>
    conditions.pipe(
      map(c1 =>
        c1.map(c2 =>
          c2.map(
            condition =>
              !!this.lazyConditionService.evaluate(condition, context),
          ),
        ),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
  );

  private featureRecordsStore = new TokenStore<
    [
      TableFeatureComponent[],
      string,
      Observable<string[][][]>,
      Observable<boolean[][]>,
    ],
    Observable<FeatureRecord[]>
  >((features, location, featureLocations$, conditions$) =>
    combineLatest([featureLocations$, conditions$]).pipe(
      switchMap(([featureLocations, conditions]) =>
        combineLatest(
          features.map((feature, i) =>
            feature.tplDirectives$.pipe(
              // Take only one value as next updated will switch again to this stream
              // But it potentially may have invalid data state because features were updated
              take(1),
              map(tplDirectives =>
                tplDirectives
                  .filter(
                    (_, j) =>
                      featureLocations[i][j].includes(location) &&
                      conditions[i][j],
                  )
                  .map(
                    tplDirective =>
                      ({
                        component: feature,
                        template: null, // This will be mapped later
                        featureTemplate: tplDirective.template,
                        featureContext$: EMPTY, // This will be mapped later
                        featureStyles$: tplDirective.styles$,
                      } as Omit<FeatureRecord, 'template'>),
                  ),
              ),
            ),
          ),
        ),
      ),
      debounceTime(0),
      map(featureRecords => featureRecords.flat() as any),
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
  );

  constructor(private lazyConditionService: LazyConditionService) {}

  ngOnDestroy(): void {
    this.featureLocationStore.clear();
    this.featureRecordsStore.clear();
  }

  trackFeatureRecords(
    features?: TableFeatureComponent[],
    location?: string,
    context?: TableFeatureTplContext,
  ): Observable<FeatureRecord[]> {
    if (!features || !location) {
      return of([]);
    }

    return this.featureRecordsStore.resolve(
      features,
      location,
      this.featureLocationStore.resolve(features),
      this.featureConditionsStore.resolve(
        this.featureConditionNodesStore.resolve(features),
        context,
      ),
    );
  }
}

class TokenStore<T extends any[], D> {
  private dataId = 0;
  private args: [T, string][] = [];
  private data: Record<string, D> = {};

  constructor(private dataFactory: (...tokens: T) => D) {}

  resolve(...tokens: T): D {
    const args = this.args.find(
      arg =>
        tokens.length === arg[0].length &&
        tokens.every((token, i) => token === arg[0][i]),
    );

    if (args) {
      return this.data[args[1]];
    }

    const data = this.dataFactory(...tokens);

    this.data[this.dataId] = data;
    this.args.push([tokens, String(this.dataId)]);
    this.dataId++;

    return data;
  }

  clear(): void {
    this.args = [];
    this.data = {};
  }
}
