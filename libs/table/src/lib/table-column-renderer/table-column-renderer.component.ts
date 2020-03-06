import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  TemplateRef,
} from '@angular/core';
import {
  TableColumn,
  TableDataRow,
  TableColumnTplContext,
} from '../table/table';
import { OrchestratorConfigItem } from '@orchestrator/core';

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
    title: '',
  };
  @Input() data: TableDataRow = {};
  @Input() template?: TemplateRef<TableColumnTplContext>;

  ///// ANY ANY ANY ANY ANY
  private itemConfig: any = {};
  private context: TableColumnTplContext = {
    $implicit: '',
    id: '',
    row: {},
    value: '',
  };

  ngOnInit(): void {
    this.initItemConfig();

    this.context = {
      $implicit: this.data[this.config.id],
      id: this.config.id,
      row: this.data,
      value: this.data[this.config.id],
    };
  }

  private initItemConfig() {
    this.itemConfig['component'] = this.config?.type;
    this.itemConfig['config'] = this.config?.typeOptions;
    this.itemConfig['items'] = this.config?.children;
  }
}
