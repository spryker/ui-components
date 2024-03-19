import { SelectOptionItem } from '@spryker/select';
import {
    Component,
    ChangeDetectionStrategy,
    OnChanges,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { TableFilterSelect, TableFilterSelectValue } from './types';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TableFilterComponent } from '@spryker/table.feature.filters';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'spy-table-filter-select',
    templateUrl: './table-filter-select.component.html',
    styleUrls: ['./table-filter-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableFilterSelectComponent implements TableFilterComponent<TableFilterSelect>, OnChanges {
    @Input() config?: TableFilterSelect;
    @Input() value?: TableFilterSelectValue;
    @Output() valueChange = new EventEmitter<TableFilterSelectValue>();
    @Output() classes = EMPTY;
    selectOptions: SelectOptionItem[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config) {
            this.selectOptions = this.config?.typeOptions?.values.map(({ value, title }) => ({
                value,
                title,
            })) as SelectOptionItem[];
        }
    }
}
