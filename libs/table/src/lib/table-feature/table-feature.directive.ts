import { Directive } from '@angular/core';

import { TableFeatureComponent } from './table-feature.component';

@Directive({
  // This selector should match with content projection selector
  // tslint:disable-next-line: directive-selector
  selector: '[spy-table-feature]',
})
export class TableFeatureDirective {
  constructor(public component: TableFeatureComponent) {}
}
