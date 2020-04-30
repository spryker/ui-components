import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  TableFeatureComponent,
  TableFeatureLocation,
  TableDataConfiguratorService,
  TableComponent,
} from '@spryker/table';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  map,
  pluck,
} from 'rxjs/operators';
import { IconRemoveModule } from '@spryker/icon/icons';
import { Subject, Observable, merge } from 'rxjs';

declare module '@spryker/table' {
  // tslint:disable-next-line: no-empty-interface
  interface TableConfig extends TableConfigWithSearch {}
}

export interface TableConfigWithSearch {
  search?: TableSearchConfig;
}

export interface TableSearchConfig {
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
export class TableSearchFeatureComponent extends TableFeatureComponent
  implements OnDestroy, OnInit {
  @Input() location = TableFeatureLocation.top;
  @Input() styles = { order: '99' };
  destroyed$ = new Subject();
  value$?: Observable<string>;
  inputValue$ = new Subject<string>();
  valueChange$ = this.inputValue$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroyed$),
  );
  placeholder$: Observable<string> | undefined;
  searchValue$?: Observable<string>;

  removeIcon = IconRemoveModule.icon;

  setTableComponent(table: TableComponent) {
    super.setTableComponent(table);

    this.placeholder$ = (table.config$ as Observable<
      TableConfigWithSearch
    >).pipe(map(config => config.search?.placeholder || ''));
  }

  ngOnInit() {
    this.valueChange$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => this.triggerUpdate(value));
  }

  setDataConfiguratorService(service: TableDataConfiguratorService) {
    super.setDataConfiguratorService(service);

    this.searchValue$ = service.config$.pipe(pluck('search')) as Observable<
      string
    >;

    this.value$ = merge(this.inputValue$, this.searchValue$);
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
