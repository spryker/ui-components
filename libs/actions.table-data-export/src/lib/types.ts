import { ActionConfig } from '@spryker/actions';
import { TableColumns, TableDataConfig, TableDataRow } from '@spryker/table';

export interface TableDataExportActionConfig extends ActionConfig {
    url: string;
    fileName?: string;
    tableId?: string;
    method?: string;
}

export interface CollectedTableData {
    tableConfig: {
        columns: TableColumns;
        data: TableDataRow[];
    };
    tableSettings: TableDataConfig;
    timeZone: string;
}
