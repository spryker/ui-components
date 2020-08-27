import {
  AfterViewInit,
  Component,
  Injector,
  Input,
  IterableDiffers,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, startWith, switchAll } from 'rxjs/operators';

import { TableFeatureConfig } from '../table-config/types';
import { TableColumnsResolverService } from '../table/columns-resolver.service';
import { TableDataConfiguratorService } from '../table/data-configurator.service';
import { TableDatasourceService } from '../table/datasource.service';
import { TableComponent } from '../table/table';
import { TableFeatureEventBus } from './table-feature-event-bus';
import { TableFeatureTplDirective } from './table-feature-tpl.directive';
import { TableActionsService } from '../table-actions/table-actions.service';

@Component({
  // This is abstract component so selector is ignored
  // tslint:disable-next-line: component-selector
  selector: 'selector',
  template: ``,
})
export abstract class TableFeatureComponent<
  C extends TableFeatureConfig = TableFeatureConfig
> implements AfterViewInit {
  @Input()
  name = '';

  @ViewChildren(TableFeatureTplDirective) tplDirectives?: QueryList<
    TableFeatureTplDirective
  >;

  config?: C;
  table?: TableComponent;
  tableEventBus?: TableFeatureEventBus;
  columnsResolverService?: TableColumnsResolverService;
  dataSourceService?: TableDatasourceService;
  dataConfiguratorService?: TableDataConfiguratorService;
  actionsService?: TableActionsService;

  private setConfig$ = new ReplaySubject<TableFeatureConfig>(1);
  config$ = this.setConfig$.asObservable() as Observable<C>;

  private setTable$ = new ReplaySubject<TableComponent>(1);
  table$ = this.setTable$.asObservable();

  private setTableEventBus$ = new ReplaySubject<TableFeatureEventBus>(1);
  tableEventBus$ = this.setTableEventBus$.asObservable();

  private setColumnsResolverService$ = new ReplaySubject<
    TableColumnsResolverService
  >(1);
  columnsResolverService$ = this.setColumnsResolverService$.asObservable();

  private setDataSourceService$ = new ReplaySubject<TableDatasourceService>(1);
  dataSourceService$ = this.setDataSourceService$.asObservable();

  private setDataConfiguratorService$ = new ReplaySubject<
    TableDataConfiguratorService
  >(1);
  dataConfiguratorService$ = this.setDataConfiguratorService$.asObservable();

  private setActionsService$ = new ReplaySubject<TableActionsService>(1);
  actionsService$ = this.setActionsService$.asObservable();

  private setTplDirectives$ = new ReplaySubject<
    Observable<TableFeatureTplDirective[]>
  >(1);
  tplDirectives$ = this.setTplDirectives$.pipe(
    switchAll(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  private iterableDiffers = this.injector.get(IterableDiffers);
  private tplDirectivesDiffer = this.iterableDiffers
    .find([])
    .create<TableFeatureTplDirective>();

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    if (!this.tplDirectives) {
      return;
    }

    this.setTplDirectives$.next(
      this.tplDirectives.changes.pipe(
        startWith(undefined),
        // This null-check is done above
        // tslint:disable-next-line: no-non-null-assertion
        map(() => this.tplDirectives!.toArray()),
        // Only pass when actual changes were made to directives
        // Otherwise Angular will emit on every re-renders
        filter(tplDirectives => !!this.tplDirectivesDiffer.diff(tplDirectives)),
      ),
    );
  }

  setConfig(config: C): void {
    this.config = config;
    this.setConfig$.next(config);
  }

  setTableComponent(table: TableComponent): void {
    this.table = table;
    this.setTable$.next(table);
  }

  setTableEventBus(eventBus: TableFeatureEventBus): void {
    this.tableEventBus = eventBus;
    this.setTableEventBus$.next(eventBus);
  }

  setColumnsResolverService(service: TableColumnsResolverService): void {
    this.columnsResolverService = service;
    this.setColumnsResolverService$.next(service);
  }

  setDataSourceService(service: TableDatasourceService): void {
    this.dataSourceService = service;
    this.setDataSourceService$.next(service);
  }

  setDataConfiguratorService(service: TableDataConfiguratorService): void {
    this.dataConfiguratorService = service;
    this.setDataConfiguratorService$.next(service);
  }

  setActionsService(service: TableActionsService): void {
    this.actionsService = service;
    this.setActionsService$.next(service);
  }
}
