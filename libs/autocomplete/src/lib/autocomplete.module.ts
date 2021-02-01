import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  imports: [CommonModule, NzAutocompleteModule],
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
