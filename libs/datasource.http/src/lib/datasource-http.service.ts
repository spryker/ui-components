import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { CacheService } from '@spryker/cache';
import { DataSerializerService } from '@spryker/data-serializer';
import { Datasource } from '@spryker/datasource';
import {
  ContextService,
  DiEncodingCodecToken,
  InjectionTokenType,
} from '@spryker/utils';
import { Observable } from 'rxjs';

import { HttpCacheId } from './http-cache-id';
import { DatasourceHttpRequestToken } from './token';
import { DatasourceHttpConfig, DatasourceHttpConfigDataIn } from './types';

@Injectable({
  providedIn: 'root',
})
export class DatasourceHttpService implements Datasource {
  constructor(
    @Inject(DiEncodingCodecToken)
    private diEncodingCodecToken: InjectionTokenType<
      typeof DiEncodingCodecToken
    >,
    private http: HttpClient,
    private dataSerializerService: DataSerializerService,
    private cacheService: CacheService,
    private contextService: ContextService,
  ) {}

  resolve(
    injector: Injector,
    config: DatasourceHttpConfig,
    context?: unknown,
  ): Observable<unknown> {
    config = { ...config };
    config.url = this.contextService.interpolate(config.url, context as any);

    if (this.isContextObject(context)) {
      for (const key in context) {
        if (context[key] === undefined) {
          delete context[key];
        }
      }
    }

    const params =
      config.dataIn === DatasourceHttpConfigDataIn.Params
        ? new HttpParams({
            fromObject: context as any, // any values can be used and custom codec supports it
            encoder: this.diEncodingCodecToken,
          })
        : undefined;
    const body =
      config.dataIn === DatasourceHttpConfigDataIn.Body
        ? this.dataSerializerService.serialize(
            DatasourceHttpRequestToken,
            context,
          )
        : undefined;
    const requestStream$ = this.http.request(
      config.url,
      config.method ?? 'GET',
      { params, body },
    );

    if (config.cache) {
      const stringToConcatenate = 'http-datasource';
      config.cache.namespace = config.cache.namespace
        ? `${stringToConcatenate}-${config.cache.namespace}`
        : stringToConcatenate;
      const cacheId = new HttpCacheId(config);

      return this.cacheService.getCached(
        cacheId,
        config.cache,
        () => requestStream$,
      );
    }

    return requestStream$;
  }

  private isContextObject(
    context: unknown,
  ): context is Record<string, unknown> {
    return typeof context === 'object';
  }
}
