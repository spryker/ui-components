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
}
