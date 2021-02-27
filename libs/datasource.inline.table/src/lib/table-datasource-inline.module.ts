import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { LensDataTransformerService } from '@spryker/data-transformer.lens';
import { ObjectMapDataTransformerService } from '@spryker/data-transformer.object-map';
import { EqualsDataTransformerFilterService } from '@spryker/data-transformer.filter.equals';
import { TextDataTransformerFilterService } from '@spryker/data-transformer.filter.text';
import { RangeDataTransformerFilterService } from '@spryker/data-transformer.filter.range';
import { DateFnsDateAdapterModule } from '@spryker/utils.date.adapter.date-fns';

@NgModule({
  imports: [
    DateFnsDateAdapterModule,
    CommonModule,
    DataTransformerModule.withTransformers({
      chain: ChainDataTransformerService,
      'array-map': ArrayMapDataTransformerService,
      'object-map': ObjectMapDataTransformerService,
      'date-parse': DateParseDataTransformerService,
      collate: CollateDataTransformerService,
      lens: LensDataTransformerService,
      'date-serialize': DateSerializeDataTransformerService,
    }),
    CollateDataTransformerModule.withConfigurators({
      table: TableDataTransformerConfiguratorService,
    }),
    CollateDataTransformerModule.withFilters({
      text: TextDataTransformerFilterService,
      equals: EqualsDataTransformerFilterService,
      range: RangeDataTransformerFilterService,
    }),
  ],
})
export class TableDatasourceInlineModule {}
