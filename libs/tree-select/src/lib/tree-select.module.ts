import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeSelectComponent } from './tree-select/tree-select.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { FormsModule } from '@angular/forms';
import { JoinModule } from '@spryker/utils';
import { I18nModule } from '@spryker/locale';
import { TreeSelectExtractKeysPipe } from './tree-select/tree-select-extract.pipe';

@NgModule({
  imports: [
    CommonModule,
    NzTreeSelectModule,
    FormsModule,
    I18nModule,
    JoinModule,
  ],
  exports: [TreeSelectComponent],
  declarations: [TreeSelectComponent, TreeSelectExtractKeysPipe],
})
export class TreeSelectModule {}
