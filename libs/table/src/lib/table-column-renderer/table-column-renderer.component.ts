import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  TemplateRef,
} from '@angular/core';
import { TableColumn, TableDataRow } from '../table/table';
import { OrchestratorConfigItem } from '@orchestrator/core';

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
export class TableColumnRendererComponent {
  @Input() config: TableColumn = {
    id: '',
    title: '',
  };
  @Input() data: TableDataRow = {};
  @Input() template?: TemplateRef<TableColumnTplContext>;

  private itemConfig: any = {};

  constructor() {}

  ngOnInit(): void {
    this.initItemConfig();
  }

  private initItemConfig() {
    this.itemConfig['component'] = this.config?.type;
    this.itemConfig['config'] = this.config?.typeOptions;
    this.itemConfig['items'] = this.config?.children;
  }
}
