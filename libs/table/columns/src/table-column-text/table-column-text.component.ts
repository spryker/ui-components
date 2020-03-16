import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  Injectable,
} from '@angular/core';
import { ColumnTypeOption, TableColumnTypeComponent } from '@spryker/table';
import {
  TableColumnComponent,
  TableColumnContext,
} from '../../../src/lib/table/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
class TableColumnTextConfig {
  @ColumnTypeOption()
  text? = this.contextService.wrap('value');

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
