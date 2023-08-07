import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDependableComponent } from './datasource-dependable.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DatasourceDependableComponent],
    exports: [DatasourceDependableComponent],
})
export class DatasourceDependableModule {}
