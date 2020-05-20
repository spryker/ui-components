import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  TableFeatureComponent,
  TableFeatureLocation,
  TableDataConfiguratorService,
  TableFeatureConfig,
  TableDataConfig,
} from '@spryker/table';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  pluck,
  map,
  switchMap,
  shareReplay,
} from 'rxjs/operators';
import { Subject, Observable, merge, combineLatest } from 'rxjs';
import { IconMagnifierModule, IconRemoveModule } from '@spryker/icon/icons';

declare module '@spryker/table' {
  interface TableConfig {
    search?: TableSearchConfig;
  }
}

export interface TableSearchConfig extends TableFeatureConfig {
  placeholder?: string;
}

@Component({
  selector: 'spy-table-search-feature',
  templateUrl: './table-search-feature.component.html',
  styleUrls: ['./table-search-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableSearchFeatureComponent,
    },
  ],
})
export class TableSearchFeatureComponent
  extends TableFeatureComponent<TableSearchConfig>
  implements OnDestroy, OnInit {
  name = 'search';
  tableFeatureLocation = TableFeatureLocation;
  suffixIcon = IconRemoveModule.icon;
  prefixIcon = IconMagnifierModule.icon;

  destroyed$ = new Subject();
  inputValue$ = new Subject<string>();
  valueChange$ = this.inputValue$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroyed$),
  );
  tableConfig$ = this.dataConfiguratorService$.pipe(
    switchMap(service => service.config$),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  placeholder$ = this.config$.pipe(
    pluck('placeholder'),
    map(placeholder => placeholder ?? ''),
  );
  searchValue$ = this.tableConfig$.pipe(pluck('search'));
  value$ = merge(this.inputValue$, this.searchValue$);
  data$ = this.table$.pipe(
    switchMap(table => table.data$),
    pluck('data'),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  isVisible$ = combineLatest([this.tableConfig$, this.data$]).pipe(
    map(([config, data]) => {
      const isFiltered = config?.filter
        ? Boolean(Object.keys(config.filter as Record<string, unknown>).length)
        : false;
      const isSearched = config?.search
        ? (config.search as string).length
        : false;
      const isChanged = isFiltered || isSearched;
      const isData = Boolean(data.length);

      return isData || (!isData && isChanged);
    }),
  );

  ngOnInit(): void {
    this.valueChange$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => this.triggerUpdate(value));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  inputValueChange(event: string): void {
    this.inputValue$.next(event);
  }

  triggerUpdate(inputValue: string): void {
    this.dataConfiguratorService?.update({
      search: inputValue || '',
    });
  }

  clearInput(): void {
    this.inputValueChange('');
  }
}
