import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    booleanAttribute,
} from '@angular/core';
import { ButtonSize, ButtonType, ButtonAttributes } from '@spryker/button';
import { ToJson } from '@spryker/utils';

@Component({
    standalone: false,
    selector: 'spy-button-icon',
    templateUrl: './button-icon.component.html',
    styleUrls: ['./button-icon.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'spy-button-icon',
        '[class.spy-button-icon--disabled]': 'disabled',
    },
})
export class ButtonIconComponent {
    @Input() type: ButtonType = ButtonType.Button;
    @Input() size: ButtonSize = ButtonSize.Large;
    @Input() iconName?: string;
    @Input() @ToJson() attrs?: ButtonAttributes;
    @Input({ transform: booleanAttribute }) disabled = false;

    @ViewChild('buttonRef', { static: true })
    buttonRef?: ElementRef<HTMLElement>;

    click() {
        this.buttonRef?.nativeElement.click();
    }
}
