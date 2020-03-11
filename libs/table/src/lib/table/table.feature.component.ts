import { Input, TemplateRef, ViewChild } from '@angular/core';
import { TableFeatureContext, TableComponent } from './table';
import { TableColumnsResolverService } from './table.columns.resolver.service';
import { TableDataFetcherService } from './table.data.fetcher.service';
import { TableDataConfiguratorService } from './table.data.configurator.service';

export abstract class TableFeatureComponent {
  @Input() location = '';
  @Input() styles?: Record<string, string>;
  @ViewChild(TemplateRef) template?: TemplateRef<TableFeatureContext>;

  table?: TableComponent;
  columnsResolverService?: TableColumnsResolverService;
  dataFetcherService?: TableDataFetcherService;
  dataConfiguratorService?: TableDataConfiguratorService;

  setTableComponent(table: TableComponent): void {
    this.table = table;
  }

  setColumnsResolverService(service: TableColumnsResolverService): void {
    this.columnsResolverService = service;
  }

  setDataFetcherService(service: TableDataFetcherService): void {
    this.dataFetcherService = service;
  }

  setDataConfiguratorService(service: TableDataConfiguratorService): void {
    this.dataConfiguratorService = service;
  }

  getTemplate(): TemplateRef<TableFeatureContext> | undefined {
    return this.template;
  }
}
