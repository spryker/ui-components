import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TableFilterComponent } from '@spryker/table.feature.filters';
import { DateRangeValueInput } from '@spryker/date-picker';
import { I18nService } from '@spryker/locale';
import { Observable, of } from 'rxjs';
import { TableFilterDateRange } from './types';

@Component({
    selector: 'spy-table-filter-date-range',
    templateUrl: './table-filter-date-range.component.html',
    styleUrls: ['./table-filter-date-range.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableFilterDateRangeComponent implements TableFilterComponent<TableFilterDateRange>, OnChanges {
    @Input() config?: TableFilterDateRange;
    @Input() value?: DateRangeValueInput = {};
    @Output() valueChange = new EventEmitter<DateRangeValueInput>();
    @Output() classes = of('spy-table-filter-date-range');

    placeholderFrom$?: Observable<string>;
    placeholderTo$?: Observable<string>;

    constructor(private i18nService: I18nService) {}

    private updatePlaceholder(property: 'placeholderFrom' | 'placeholderTo', defaultToken: string): Observable<string> {
        return this.config?.typeOptions?.[property]
            ? (of(this.config.typeOptions[property]) as Observable<string>)
            : this.i18nService.translate(defaultToken);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('config' in changes) {
            this.placeholderFrom$ = this.updatePlaceholder('placeholderFrom', 'table.filter.date-range.from');
            this.placeholderTo$ = this.updatePlaceholder('placeholderTo', 'table.filter.date-range.to');
        }

        if ('value' in changes && !this.value) {
            this.value = {};
        }
    }
}
