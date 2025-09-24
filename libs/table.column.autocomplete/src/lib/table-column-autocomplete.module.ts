import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnAutocompleteComponent } from './table-column-autocomplete.component';
import { InputModule } from '@spryker/input';
import { ContextModule, InvokeModule } from '@spryker/utils';
import { FormItemModule } from '@spryker/form-item';
import { AutocompleteModule } from '@spryker/autocomplete';

@NgModule({
    imports: [CommonModule, InputModule, ContextModule, FormItemModule, InvokeModule, AutocompleteModule],
    declarations: [TableColumnAutocompleteComponent],
    exports: [TableColumnAutocompleteComponent],
})
export class TableColumnAutocompleteModule {}
