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
} from './../../../src/lib/table/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnImageConfig {
  @ColumnTypeOption()
  src? = this.contextService.wrap('value');

  constructor(private contextService: ContextService) {}
}

@Component({
  selector: 'spy-table-column-image',
  templateUrl: './table-column-image.component.html',
  styleUrls: ['./table-column-image.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnImageConfig)
export class TableColumnImageComponent
  implements TableColumnComponent<TableColumnImageConfig> {
  @Input() config?: TableColumnImageConfig;
  @Input() context?: TableColumnContext;
}
