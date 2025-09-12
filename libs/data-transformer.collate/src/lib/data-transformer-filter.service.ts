import { Injectable, Injector, inject } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { DataTransformerFiltersTypesToken } from './tokens';
import {
    DataTransformerFilterConfig,
    DataTransformerFilterDeclaration,
    DataTransformerFilterRegistry,
    DataTransformerFilterRegistryType,
    DataTransformerFilterData,
    DataTransformerFilterByValue,
    DataFilterTransformerByPropName,
    DataTransformerFilter,
} from './types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataTransformerFilterService {
    private injector = inject(Injector);
    private filtersTypes = inject<InjectionTokenType<typeof DataTransformerFiltersTypesToken>>(
        DataTransformerFiltersTypesToken,
        { optional: true },
    );

    private filters: Partial<DataTransformerFilterDeclaration> =
        this.filtersTypes?.reduce((filters, filter) => ({ ...filters, ...filter }), {}) ?? {};

    filter(
        type: DataTransformerFilterRegistryType | string,
        data: DataTransformerFilterData,
        options: DataTransformerFilterConfig,
        byValue: DataTransformerFilterByValue,
        transformerByPropName?: DataFilterTransformerByPropName,
    ): Observable<DataTransformerFilterData> {
        if (!this.isFilterRegisteredType(type)) {
            throw Error(`DataTransformerFilterService: Unknown filter type ${type}`);
        }

        const filterService: DataTransformerFilter = this.injector.get(this.filters[type]);

        return filterService.filter(data, options, byValue, transformerByPropName);
    }

    private isFilterRegisteredType(
        type: DataTransformerFilterRegistryType | string,
    ): type is keyof DataTransformerFilterRegistry {
        return type in this.filters;
    }
}
