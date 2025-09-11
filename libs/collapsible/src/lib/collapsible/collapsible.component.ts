import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    ContentChild,
    TemplateRef,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
    standalone: false,
    selector: 'spy-collapsible',
    templateUrl: './collapsible.component.html',
    styleUrls: ['./collapsible.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CollapsibleComponent {
    @Input() spyTitle = '';
    @Input() titleIcon = '';
    @Input() @ToBoolean() active = false;
    @Input() @ToBoolean() disabled = false;
    @Input() @ToBoolean() alwaysRender = true;

    @Output() activeChange = new EventEmitter<boolean>();

    @ContentChild(TemplateRef) contentTemplate?: TemplateRef<any>;

    collapse(): void {
        this.active = false;
    }

    expand(): void {
        this.active = true;
    }

    toggle(): boolean {
        if (this.active) {
            this.collapse();
        } else {
            this.expand();
        }

        return this.active;
    }

    updateActive(isActive: boolean): void {
        this.active = isActive;

        this.activeChange.emit(this.isCollapsed());
    }

    isCollapsed(): boolean {
        return this.active;
    }
}
