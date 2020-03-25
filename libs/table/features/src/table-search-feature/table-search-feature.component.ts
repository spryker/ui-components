import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { TableFeatureComponent } from '@spryker/table';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  takeUntil,
  filter,
} from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

declare module '@spryker/table' {
  interface TableConfig extends TableSearchConfig {
    search?: TableSearchConfig;
  }
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
  @Input() location = 'top';
  @Input() styles = { order: '99' };
  placeholder = '';
  destroyed$ = new Subject();
  setValue$ = new Subject<string>();
  valueChange$ = this.setValue$.pipe(
    filter(value => value.length > 2 || !value.length),
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(this.destroyed$),
  );
  placeholderSubject$: Observable<TableSearchConfig> | undefined;

  ngAfterViewInit(): void {
    this.placeholderSubject$ = this.table?.config$.pipe(
      pluck('search', 'placeholder'),
    );

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
      search: inputValue || undefined,
    });
  }
}
