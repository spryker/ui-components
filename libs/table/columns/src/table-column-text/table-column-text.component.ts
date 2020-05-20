import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Injectable,
} from '@angular/core';
import {
  ColumnTypeOption,
  TableColumnTypeComponent,
  TableColumnComponent,
  TableColumnContext,
} from '@spryker/table';
import { ContextService } from '@spryker/utils';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    text: TableColumnTextConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class TableColumnTextConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('value');
  @ColumnTypeOption()
  color?: string;

  constructor(private contextService: ContextService) {}
}

@Component({
  selector: 'spy-table-column-text',
  templateUrl: './table-column-text.component.html',
  styleUrls: ['./table-column-text.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnTextConfig)
export class TableColumnTextComponent
  implements TableColumnComponent<TableColumnTextConfig> {
  @Input() config?: TableColumnTextConfig;
  @Input() context?: TableColumnContext;
}
