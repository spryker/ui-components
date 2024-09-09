import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    HostBinding,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';
import { IconRemoveModule } from '@spryker/icon/icons';

@Component({
    selector: 'spy-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-tag',
        tabIndex: '-1',
    },
})
export class TagComponent {
    @Input() @ToBoolean() @HostBinding('class.spy-tag-disabled') disabled = false;
    @Input() @ToBoolean() removable = true;
    @Output() onRemove = new EventEmitter<MouseEvent>();
    icon = IconRemoveModule.icon;

    removeTag(e: MouseEvent): void {
        if (!this.disabled) {
            this.onRemove.emit(e);
        }
    }
}
