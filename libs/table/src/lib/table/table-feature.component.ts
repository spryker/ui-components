import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, startWith, switchAll } from 'rxjs/operators';

import { TableColumnsResolverService } from './columns-resolver.service';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDataFetcherService } from './data-fetcher.service';
import { TableComponent } from './table';
import { TableEventBus } from './table-event-bus';
import { TableFeatureTplDirective } from './table-feature-tpl.directive';

export class TableFeatureEventBus {
  constructor(private name: string, private tableEventBus: TableEventBus) {}

  emit<D = unknown>(data: D, eventName?: string) {
    this.tableEventBus.emit(this.name, data, eventName);
  }

  on<D = unknown>(feature: string, eventName?: string): Observable<D> {
    return this.tableEventBus.on<D>(feature, eventName);
  }
}

@Component({
  // This is abstract component so selector is ignored
  // tslint:disable-next-line: component-selector
  selector: 'selector',
  template: ``,
})
export abstract class TableFeatureComponent implements AfterViewInit {
  abstract readonly name: string;

  @ViewChildren(TableFeatureTplDirective) tplDirectives?: QueryList<
    TableFeatureTplDirective
  >;

  table?: TableComponent;
  tableEventBus?: TableFeatureEventBus;
  columnsResolverService?: TableColumnsResolverService;
  dataFetcherService?: TableDataFetcherService;
  dataConfiguratorService?: TableDataConfiguratorService;

  table$ = new ReplaySubject<TableComponent>(1);
  tableEventBus$ = new ReplaySubject<TableFeatureEventBus>(1);
  columnsResolverService$ = new ReplaySubject<TableColumnsResolverService>(1);
  dataFetcherService$ = new ReplaySubject<TableDataFetcherService>(1);
  dataConfiguratorService$ = new ReplaySubject<TableDataConfiguratorService>(1);

  private setTplDirectives$ = new ReplaySubject<
    Observable<TableFeatureTplDirective[]>
  >(1);
  tplDirectives$ = this.setTplDirectives$.pipe(switchAll());

  ngAfterViewInit(): void {
    if (!this.tplDirectives) {
      return;
    }

    this.setTplDirectives$.next(
      this.tplDirectives.changes.pipe(
        startWith(this.tplDirectives.toArray()),
        // This null-check is done above
        // tslint:disable-next-line: no-non-null-assertion
        map(() => this.tplDirectives!.toArray()),
      ),
    );
  }

  setTableComponent(table: TableComponent): void {
    this.table = table;
    this.table$.next(table);
  }

  setTableEventBus(eventBus: TableFeatureEventBus): void {
    this.tableEventBus = eventBus;
    this.tableEventBus$.next(eventBus);
  }

  setColumnsResolverService(service: TableColumnsResolverService): void {
    this.columnsResolverService = service;
    this.columnsResolverService$.next(service);
  }

  setDataFetcherService(service: TableDataFetcherService): void {
    this.dataFetcherService = service;
    this.dataFetcherService$.next(service);
  }

  setDataConfiguratorService(service: TableDataConfiguratorService): void {
    this.dataConfiguratorService = service;
    this.dataConfiguratorService$.next(service);
  }
}
