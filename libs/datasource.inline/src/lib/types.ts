import { DatasourceConfig } from '@spryker/datasource';

export interface DatasourceInlineConfig extends DatasourceConfig {
    data: unknown;
    dependsOnContext?: {
        contextKey: string;
        default?: unknown;
    };
}

export type DependableDatasourceInlineContext = {
    [Property in DatasourceInlineConfig['dependsOnContext']['contextKey']]: string;
};
