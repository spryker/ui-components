import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ViewChild,
    TemplateRef,
    SimpleChanges,
    OnChanges,
    booleanAttribute,
} from '@angular/core';
import { IconErrorModule } from '@spryker/icon/icons';
import { TabTemplateContext } from 'ng-zorro-antd/tabs';

@Component({
    standalone: false,
    selector: 'spy-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TabComponent implements OnChanges {
    iconErrorReference = IconErrorModule;
    @Input() spyTitle = '';
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) hasWarning = false;
    @Input() iconName?: string;

    @Output() hasWarningChange = new EventEmitter<boolean>();

    @ViewChild('contentTpl') template!: TemplateRef<void>;
    @ViewChild('titleTpl') titleTemplate!: TemplateRef<TabTemplateContext>;

    ngOnChanges(changes: SimpleChanges): void {
        if ('hasWarning' in changes) {
            this.hasWarningChange.emit(this.hasWarning);
        }
    }
}
