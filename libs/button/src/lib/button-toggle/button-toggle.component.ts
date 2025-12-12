import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    booleanAttribute,
} from '@angular/core';

import { ToJson } from '@spryker/utils';
import { ButtonAttributes } from '../button-core/types';

@Component({
    standalone: false,
    selector: 'spy-button-toggle',
    templateUrl: './button-toggle.component.html',
    styleUrls: ['./button-toggle.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'spy-button-toggle',
    },
})
export class ButtonToggleComponent {
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) toggled = false;
    @Input() @ToJson() attrs?: ButtonAttributes;
    @Output() toggledChange = new EventEmitter<boolean>();

    @ViewChild('buttonRef') buttonRef?: ElementRef;

    click(): void {
        this.buttonRef?.nativeElement.click();
    }

    clickHandler(): void {
        this.toggled = !this.toggled;
        this.toggledChange.emit(this.toggled);
    }
}
