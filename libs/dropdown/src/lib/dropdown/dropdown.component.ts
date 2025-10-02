import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { NzDropDownDirective } from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzSubMenuComponent } from 'ng-zorro-antd/menu';

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
    selector: 'spy-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.spy-dropdown--open]': 'visible',
    },
})
export class DropdownComponent {
    @Input() items: DropdownItem[] = [];
    @Input() placement: Placement = 'bottomRight';
    @Input() trigger: Trigger = 'hover';
    @Input() ariaLabel: string = null;
    @Input({ transform: booleanAttribute }) visible = true;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() actionTriggered = new EventEmitter<string>();

    @ViewChild(NzDropDownDirective, { read: ElementRef }) menuTrigger: ElementRef<HTMLElement>;
    @ViewChild(NzMenuDirective, { read: ElementRef }) menu: ElementRef<HTMLElement>;

    @ViewChildren(NzSubMenuComponent) submenuTriggers: QueryList<NzSubMenuComponent>;
    @ViewChildren('submenu') submenuElements: QueryList<ElementRef<HTMLElement>>;

    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Tab' && document.activeElement === this.menuTrigger.nativeElement) {
            this.visible = false;

            return;
        }

        const events = ['Enter', ' ', 'ArrowDown'];

        if (!events.includes(event.key) || !this.items.length) {
            return;
        }

        event.preventDefault();

        if (event.key === 'ArrowDown') {
            this.getMenuItems(this.menu.nativeElement)[0].focus();

            return;
        }

        this.visible = !this.visible;
    }

    onMenuKeyDown(event: KeyboardEvent, submenuIndex?: number): void {
        const events = ['ArrowUp', 'Tab', 'ArrowDown'];
        const items = this.getMenuItems(event.currentTarget as HTMLElement);
        const { length } = items;

        if (!events.includes(event.key) || !length) {
            return;
        }

        event.preventDefault();

        if (event.key === 'Tab' && event.shiftKey) {
            const focusElement =
                submenuIndex === undefined
                    ? this.menuTrigger.nativeElement
                    : this.getMenuItems(
                          submenuIndex === 0
                              ? this.menu.nativeElement
                              : this.submenuElements.get(submenuIndex - 1).nativeElement,
                      )[0];

            focusElement.focus();
            this.visible = submenuIndex !== undefined;
            this.submenuTriggers.get(submenuIndex)?.setOpenStateWithoutDebounce(false);

            return;
        }

        const currentIndex = items.findIndex((item) => item === document.activeElement);
        const index = event.key === 'ArrowUp' ? (currentIndex - 1 + length) % length : (currentIndex + 1) % length;

        items[index].focus();
    }

    onItemKeyDown(event: KeyboardEvent, submenuIndex?: number): void {
        if (event.key !== ' ' && event.key !== 'Enter') {
            return;
        }

        const target = event.target as HTMLElement;

        target.click();

        if (submenuIndex !== undefined) {
            this.submenuTriggers.get(submenuIndex).setOpenStateWithoutDebounce(true);

            setTimeout(() => {
                this.getMenuItems(this.submenuElements.get(submenuIndex).nativeElement)[0].focus();
            });

            return;
        }

        this.submenuTriggers.forEach((trigger) => trigger.setOpenStateWithoutDebounce(false));
    }

    onItemClick(action: string): void {
        this.actionTriggered.emit(action);
    }

    private getMenuItems(menu: HTMLElement): HTMLElement[] {
        return Array.from(menu.querySelectorAll('.spy-dropdown-item__item'));
    }
}
