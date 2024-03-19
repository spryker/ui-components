import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponentsModule } from '@spryker/web-components';
import { DatasourceDependableComponent } from './datasource-dependable.component';

@NgModule({
    imports: [CommonModule, SelectComponentsModule],
    declarations: [DatasourceDependableComponent],
    exports: [DatasourceDependableComponent],
})
export class DatasourceDependableModule {}
