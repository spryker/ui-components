import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input, TemplateRef } from '@angular/core';
import { TableColumn, TableDataRow } from '../table/table';

interface ColTplDirective {
  colTpl: TableColumn['id'];
  templateRef: TemplateRef<TableColumnTplContext>;
}

interface TableColumnContext {
  value: unknown;
  row: TableDataRow;
  id: TableColumn['id'];
}

interface TableColumnTplContext extends TableColumnContext {
  $implicit: TableColumnContext['value'];
}

@Component({
  selector: 'spy-table-column-renderer',
  templateUrl: './table-column-renderer.component.html',
  styleUrls: ['./table-column-renderer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableColumnRendererComponent implements OnInit {
  @Input() config: TableColumn = {
    id: '',
    title: ''
  };
  @Input() data: TableDataRow = {};
  @Input() template?: TemplateRef<TableColumnTplContext>;


  constructor() { }

  ngOnInit(): void {
  }

}
