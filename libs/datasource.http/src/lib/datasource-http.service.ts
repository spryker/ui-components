import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { CacheService } from '@spryker/cache';
import { DataSerializerService } from '@spryker/data-serializer';
import { Datasource } from '@spryker/datasource';
import { ContextService, DiEncodingCodecToken, InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';

import { HttpCacheId } from './http-cache-id';
import { DatasourceHttpRequestToken } from './token';
import { DatasourceHttpConfig, DatasourceHttpConfigDataIn } from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceHttpService implements Datasource {
    private diEncodingCodecToken = inject<InjectionTokenType<typeof DiEncodingCodecToken>>(DiEncodingCodecToken);
    private http = inject(HttpClient);
    private dataSerializerService = inject(DataSerializerService);
    private cacheService = inject(CacheService);
    private contextService = inject(ContextService);

    resolve(injector: Injector, config: DatasourceHttpConfig, context?: unknown): Observable<unknown> {
        config = { ...config };
        config.url = this.contextService.interpolate(config.url, context as any);
        let contextParams: Record<string, unknown>;

        if (this.isContextObject(context)) {
            for (const key in context) {
                if (context[key] === undefined) {
                    delete context[key];
                }
            }

            contextParams = Object.assign({}, context);
            Object.keys(contextParams).forEach((key) => {
                if (this.isContextObject(contextParams[key])) {
                    contextParams[key] = JSON.stringify(contextParams[key]);
                }
            });
        }

        const params =
            !config.dataIn || config.dataIn === DatasourceHttpConfigDataIn.Params
                ? new HttpParams({
                      fromObject: this.isContextObject(context) ? contextParams : (context as any), // any values can be used and custom codec supports it
                      encoder: this.diEncodingCodecToken,
                  })
                : undefined;
        const body =
            config.dataIn === DatasourceHttpConfigDataIn.Body
                ? this.dataSerializerService.serialize(DatasourceHttpRequestToken, context)
                : undefined;
        const requestStream$ = this.http.request(config.method ?? 'GET', config.url, { params, body });

        if (config.cache) {
            const httpDatasourceNamespace = 'http-datasource';
            config.cache.namespace = config.cache.namespace
                ? `${httpDatasourceNamespace}-${config.cache.namespace}`
                : httpDatasourceNamespace;
            const cacheId = new HttpCacheId(config);

            return this.cacheService.getCached(cacheId, config.cache, () => requestStream$);
        }

        return requestStream$;
    }

    private isContextObject(context: unknown): context is Record<string, unknown> {
        return typeof context === 'object';
    }
}
