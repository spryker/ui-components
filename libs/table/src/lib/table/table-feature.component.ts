import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { TableColumnsResolverService } from './columns-resolver.service';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDataFetcherService } from './data-fetcher.service';
import { TableFeatureContext } from './table';
import { TableComponent } from './table.component';

@Component({
  selector: 'selector',
  template: ``,
})
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
