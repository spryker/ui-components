import { Injectable, Injector, inject } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { Observable } from 'rxjs';

import { DataTransformerConfiguratorTypesToken } from './tokens';
import {
    DataTransformerConfiguratorConfigT,
    DataTransformerConfiguratorConfig,
    DataTransformerConfiguratorDeclaration,
    DataTransformerConfiguratorRegistry,
    DataTransformerConfiguratorType,
    DataTransformerConfigurator,
} from './types';

@Injectable({ providedIn: 'root' })
export class DataTransformerConfiguratorService {
    private dataConfiguratorsTypes = inject<InjectionTokenType<typeof DataTransformerConfiguratorTypesToken>>(
        DataTransformerConfiguratorTypesToken,
        { optional: true },
    );

    private dataConfigurators: Partial<DataTransformerConfiguratorDeclaration> =
        this.dataConfiguratorsTypes?.reduce(
            (dataConfigurators, dataConfigurator) => ({
                ...dataConfigurators,
                ...dataConfigurator,
            }),
            {},
        ) ?? {};

    resolve(
        config: DataTransformerConfiguratorConfig,
        injector: Injector,
    ): Observable<DataTransformerConfiguratorConfigT> {
        if (!this.isDataConfiguratorRegisteredType(config.type)) {
            throw Error(`DataTransformerConfiguratorService: Unknown data configurator type ${String(config.type)}`);
        }

        const dataConfigurator: DataTransformerConfigurator = injector.get(this.dataConfigurators[config.type]);

        return dataConfigurator.resolve(injector);
    }

    private isDataConfiguratorRegisteredType(
        type: DataTransformerConfiguratorType,
    ): type is keyof DataTransformerConfiguratorRegistry {
        return type in this.dataConfigurators;
    }
}
