import { Directive, inject } from '@angular/core';

import { TableFeatureComponent } from './table-feature.component';

@Directive({
    standalone: false,
    // This selector should match with content projection selector
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[spy-table-feature]',
})
export class TableFeatureDirective {
    component = inject(TableFeatureComponent);
}
