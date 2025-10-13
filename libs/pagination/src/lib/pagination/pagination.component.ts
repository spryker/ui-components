import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    booleanAttribute,
} from '@angular/core';
import { SelectValueSelected } from '@spryker/select';

@Component({
    standalone: false,
    selector: 'spy-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
    @Input() total = 0;
    @Input() page = 1;
    @Input() pageSize = 10;
    @Input({ transform: booleanAttribute }) hideOnSinglePage = false;
    @Input() pageSizeOptions = [10, 20, 50];
    @Input() placeholder = '';
    @Input({ transform: booleanAttribute }) disableClear = false;
    @Output() pageChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();

    pageSizeChangeHandler(pageSizeValue: SelectValueSelected): void {
        if (pageSizeValue && typeof pageSizeValue === 'object') {
            this.pageSizeChange.emit((pageSizeValue[0] as number) ?? null);

            return;
        }

        this.pageSizeChange.emit(pageSizeValue as number);
    }
}
