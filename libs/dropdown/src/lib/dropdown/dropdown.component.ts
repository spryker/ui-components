import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';

export interface DropdownItem {
    action: string;
    title: string;
    icon?: string;
    disabled?: boolean;
    subItems?: DropdownItem[];
}
export type Placement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
export type Trigger = 'click' | 'hover';

@Component({
    standalone: false,
    selector: 'spy-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
    @Input() items: DropdownItem[] = [];
    @Input() placement: Placement = 'bottomRight';
    @Input() trigger: Trigger = 'hover';
    @HostBinding('class.spy-dropdown--open')
    @Input({ transform: booleanAttribute })
    visible = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() actionTriggered = new EventEmitter<string>();

    /**
     * Keyboard activation of the trigger.
     *
     * `nz-dropdown` opens on a native `click` or on `mouseenter`, depending on `trigger`, and a
     * keyboard produces neither on a non-button host — so the visible state is toggled directly.
     * `[(nzVisible)]` pushes it back into the directive, which emits `nzVisibleChange`, so
     * `visibleChange` fires exactly as it does for a pointer toggle.
     */
    protected toggleVisible(event: Event): void {
        event.preventDefault();

        if (this.disabled) {
            return;
        }

        this.visible = !this.visible;
    }

    /**
     * Keyboard activation of a menu item.
     *
     * Dispatching the item's own native click, rather than emitting `actionTriggered` here, keeps
     * a single activation path: `nz-menu-item`'s host click listener is what tells the dropdown to
     * close (`descendantMenuItemClick$`), and re-emitting directly would leave the menu open after
     * an Enter press.
     */
    protected activateItem(event: Event): void {
        event.preventDefault();
        (event.currentTarget as HTMLElement).click();
    }
}
