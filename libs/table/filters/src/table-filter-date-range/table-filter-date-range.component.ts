import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { TableFilterComponent } from '@spryker/table/features';
import { TableFilterDateRange } from './types';
import { DateRangeValueInput } from '@spryker/date-picker';
import { Observable, of } from 'rxjs';
import { I18nService } from '@spryker/locale';
import { switchMap, tap } from 'rxjs/operators';

declare module '@spryker/table/features' {
  interface TableFiltersRegistry {
    dateRange: TableFilterDateRange;
  }
}

@Component({
  selector: 'spy-table-filter-date-range',
  templateUrl: './table-filter-date-range.component.html',
  styleUrls: ['./table-filter-date-range.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFilterDateRangeComponent
  implements TableFilterComponent<TableFilterDateRange> {
  @Input() config?: TableFilterDateRange;
  @Input() value?: DateRangeValueInput = {};
  @Output() valueChange = new EventEmitter<DateRangeValueInput>();

  placeholderFrom$?: Observable<string>;
  placeholderTo$?: Observable<string>;

  constructor(private i18nService: I18nService) {}

  updatePlaceholder(
    property: 'placeholderFrom' | 'placeholderTo',
    template: string,
  ): Observable<string> {
    return of(this.config?.typeOptions?.[property]).pipe(
      switchMap(placeholder =>
        placeholder ? of(placeholder) : this.i18nService.translate(template),
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) {
      this.placeholderFrom$ = this.updatePlaceholder(
        'placeholderFrom',
        'table.date-range-picker:from',
      );
      this.placeholderTo$ = this.updatePlaceholder(
        'placeholderTo',
        'table.date-range-picker:to',
      );
    }

    if ('value' in changes && !this.value) {
      this.value = {};
    }
  }
}
