import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import {
  debounceTime,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { FeatureRecord } from './types';

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
    ).pipe(
      debounceTime(0),
      tap(locations => console.log('locations', locations)),
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
  );

  private featureRecordsStore = new TokenStore<
    [TableFeatureComponent[], string, Observable<string[][][]>],
    Observable<FeatureRecord[]>
  >((features, location, featureLocations$) =>
    featureLocations$.pipe(
      switchMap(featureLocations =>
        combineLatest(
          features.map((feature, i) =>
            feature.tplDirectives$.pipe(
              // Take only one value as next updated will switch again to this stream
              // But it potentially may have invalid data state because features were updated
              take(1),
              map(tplDirectives =>
                tplDirectives
                  .filter((_, j) => featureLocations[i][j].includes(location))
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

  ngOnDestroy(): void {
    this.featureLocationStore.clear();
    this.featureRecordsStore.clear();
  }

  trackFeatureRecords(features?: TableFeatureComponent[], location?: string) {
    if (!features || !location) {
      return of([]);
    }

    return this.featureRecordsStore.resolve(
      features,
      location,
      this.featureLocationStore.resolve(features),
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

  clear() {
    this.args = [];
    this.data = {};
  }
}
