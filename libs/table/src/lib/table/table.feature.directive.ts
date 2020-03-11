import { Directive } from '@angular/core';
import { TableFeatureComponent } from './table';

@Directive({
  selector: 'spy-table-feature',
})
export class TableFeatureDirective {
  constructor(public component: TableFeatureComponent) {}
}
