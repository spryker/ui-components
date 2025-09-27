import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    ContentChild,
    TemplateRef,
    booleanAttribute,
} from '@angular/core';

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
    @Input({ transform: booleanAttribute }) active = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) alwaysRender = true;

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
