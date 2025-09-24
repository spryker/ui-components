import { DatasourceConfig } from '@spryker/datasource';
import { Observable } from 'rxjs';

export interface DatasourceDependableConfig extends DatasourceConfig {
    id: string;
    datasource: DatasourceConfig;
}

export interface DatasourceDependableElementsConfig {
    [id: string]: DatasourceDependableElement;
}

export abstract class DatasourceDependableElement {
    abstract getValueChanges(): Observable<unknown>;
}
