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
} from '@spryker/table';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  pluck,
  map,
} from 'rxjs/operators';
import { Subject, Observable, merge } from 'rxjs';
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
  value$?: Observable<string>;
  inputValue$ = new Subject<string>();
  valueChange$ = this.inputValue$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroyed$),
  );
  placeholder$ = this.config$.pipe(
    pluck('placeholder'),
    map(placeholder => placeholder ?? ''),
  );
  searchValue$?: Observable<string>;

  ngOnInit(): void {
    this.valueChange$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => this.triggerUpdate(value));
  }

  setDataConfiguratorService(service: TableDataConfiguratorService): void {
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
