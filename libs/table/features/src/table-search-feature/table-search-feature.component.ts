import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  map,
  pluck,
} from 'rxjs/operators';
import { IconRemoveModule } from '@spryker/icon/icons';
import { Subject, Observable } from 'rxjs';

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
  implements OnDestroy, AfterViewInit {
  @Input() location = TableFeatureLocation.top;
  @Input() styles = { order: '99' };
  destroyed$ = new Subject();
  value$ = new Subject<string>();
  valueChange$ = this.value$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroyed$),
  );
  placeholder$: Observable<string> | undefined;
  searchValue$?: Observable<unknown> | undefined;

  removeIcon = IconRemoveModule.icon;

  ngAfterViewInit(): void {
    this.placeholder$ = (this.table?.config$ as Observable<
      TableConfigWithSearch
    >).pipe(map(config => config.search?.placeholder || ''));

    this.searchValue$ = this.dataConfiguratorService?.config$.pipe(
      pluck('search'),
    );

    this.valueChange$.subscribe((value: string) => this.triggerUpdate(value));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  inputValueChange(event: string): void {
    this.value$.next(event);
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
