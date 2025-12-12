import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableFilterComponent } from '@spryker/table.feature.filters';
import { EMPTY } from 'rxjs';

@Component({
    standalone: false,
    selector: 'spy-table-filter',
    template: `
        <input type="text" [value]="value" style="border: 2px solid lightskyblue; height: 50px; padding: 10px;" />
    `,
})
export class TableDummyFilterComponent implements TableFilterComponent<any>, OnChanges {
    @Input() config?: any;
    @Input() value?: any;
    valueChange: any;
    classes = EMPTY;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config) {
            this.value = this.config?.typeOptions?.value;
        }
    }
}
