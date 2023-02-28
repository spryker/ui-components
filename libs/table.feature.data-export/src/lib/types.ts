import { TableFeatureConfig } from '@spryker/table';
import { TableDataExportActionConfig } from '@spryker/actions.table-data-export';

export interface TableDataExportConfig extends TableFeatureConfig {
    action: TableDataExportActionConfig;
    actionTitle: string;
}
