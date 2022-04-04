import { Directive } from '@angular/core';

import { TableFeatureComponent } from './table-feature.component';

@Directive({
  // This selector should match with content projection selector
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[spy-table-feature]',
})
export class TableFeatureDirective {
  constructor(public component: TableFeatureComponent) {}
}
