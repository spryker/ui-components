import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataTransformerModule } from '@spryker/data-transformer';
import { ArrayMapDataTransformerService } from '@spryker/data-transformer.array-map';
import { ChainDataTransformerService } from '@spryker/data-transformer.chain';
import {
  CollateDataTransformerModule,
  CollateDataTransformerService,
} from '@spryker/data-transformer.collate';
import { TableDataTransformerConfiguratorService } from '@spryker/data-transformer.configurator.table';
import { DateParseDataTransformerService } from '@spryker/data-transformer.date-parse';
import { DateSerializeDataTransformerService } from '@spryker/data-transformer.date-serialize';
import { EqualsDataTransformerFilterService } from '@spryker/data-transformer.filter.equals';
import { RangeDataTransformerFilterService } from '@spryker/data-transformer.filter.range';
import { TextDataTransformerFilterService } from '@spryker/data-transformer.filter.text';
import { LensDataTransformerService } from '@spryker/data-transformer.lens';
import { ObjectMapDataTransformerService } from '@spryker/data-transformer.object-map';
import { TableModule } from '@spryker/table';
import { DateModule } from '@spryker/utils/date';

@NgModule({
  imports: [
    DateModule,
    DataTransformerModule,
    CollateDataTransformerModule,
    TableModule,
  ],
})
export class TableDatasourceInlineModule {
  static withConfig(): ModuleWithProviders<TableDatasourceInlineModule> {
    return {
      ngModule: TableDatasourceInlineModule,
      providers: [
        DataTransformerModule.withTransformers({
          chain: ChainDataTransformerService,
          'array-map': ArrayMapDataTransformerService,
          'object-map': ObjectMapDataTransformerService,
          'date-parse': DateParseDataTransformerService,
          collate: CollateDataTransformerService,
          lens: LensDataTransformerService,
          'date-serialize': DateSerializeDataTransformerService,
        } as any).providers || [],
        CollateDataTransformerModule.withConfigurators({
          table: TableDataTransformerConfiguratorService,
        }).providers || [],
        CollateDataTransformerModule.withFilters({
          text: TextDataTransformerFilterService,
          equals: EqualsDataTransformerFilterService,
          range: RangeDataTransformerFilterService,
        } as any).providers || [],
      ],
    };
  }
}
