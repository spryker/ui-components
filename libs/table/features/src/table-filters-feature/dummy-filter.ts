import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableFilterComponent } from '@spryker/table/features';

@Component({
  selector: 'spy-table-filter',
  template: `
    <input
      type="text"
      [value]="value"
      style="border: 2px solid lightskyblue; height: 50px; padding: 10px;"
    />
  `,
})
export class TableDummyFilterComponent implements TableFilterComponent<any>, OnChanges {
  @Input() config?: any;
  valueChange: any;
  value = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.value = this.config?.typeOptions?.value;
    }
  }
}
