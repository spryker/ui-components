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
    chip: TableColumnChipConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class TableColumnChipConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('displayValue');
  @ColumnTypeOption()
  color?: string;

  constructor(private contextService: ContextService) {}
}

@Component({
  selector: 'spy-table-column-chip',
  templateUrl: './table-column-chip.component.html',
  styleUrls: ['./table-column-chip.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnChipConfig)
export class TableColumnChipComponent
  implements TableColumnComponent<TableColumnChipConfig> {
  @Input() config?: TableColumnChipConfig;
  @Input() context?: TableColumnContext;
}
