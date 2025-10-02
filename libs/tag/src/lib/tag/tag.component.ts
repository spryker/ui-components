import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
    booleanAttribute,
} from '@angular/core';
import { IconRemoveModule } from '@spryker/icon/icons';

@Component({
    standalone: false,
    selector: 'spy-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-tag',
    },
})
export class TagComponent {
    @Input({ transform: booleanAttribute }) @HostBinding('class.spy-tag-disabled') disabled = false;
    @Input({ transform: booleanAttribute }) removable = true;
    @Output() remove = new EventEmitter<MouseEvent>();
    icon = IconRemoveModule.icon;

    removeTag(event: MouseEvent): void {
        if (!this.disabled && this.removable) {
            this.remove.emit(event);
        }
    }
}
