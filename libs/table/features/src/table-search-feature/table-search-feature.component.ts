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
  filter,
  map,
} from 'rxjs/operators';
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
  name = 'search';

  @Input() location = TableFeatureLocation.top;
  @Input() styles = { order: '99' };

  destroyed$ = new Subject();
  setValue$ = new Subject<string>();
  valueChange$ = this.setValue$.pipe(
    filter(value => value.length > 2 || !value.length),
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroyed$),
  );
  placeholder$: Observable<string> | undefined;

  ngAfterViewInit(): void {
    this.placeholder$ = (this.table?.config$ as Observable<
      TableConfigWithSearch
    >).pipe(map(config => config.search?.placeholder || ''));

    this.valueChange$.subscribe((value: string) => this.triggerUpdate(value));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  inputValueChange(event: string): void {
    this.setValue$.next(event);
  }

  triggerUpdate(inputValue: string): void {
    this.dataConfiguratorService?.update({
      search: inputValue || '',
    });
  }
}
