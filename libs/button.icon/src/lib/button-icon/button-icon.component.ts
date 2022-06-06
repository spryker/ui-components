import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { ButtonSize, ButtonType, ButtonAttributes } from '@spryker/button';
import { ToBoolean, ToJson } from '@spryker/utils';

@Component({
    selector: 'spy-button-icon',
    host: { class: 'spy-button-icon' },
    templateUrl: './button-icon.component.html',
    styleUrls: ['./button-icon.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconComponent {
    @Input() type: ButtonType = ButtonType.Button;
    @Input() size: ButtonSize = ButtonSize.Large;
    @Input() iconName?: string;
    @Input() @ToJson() attrs?: ButtonAttributes;
    @Input()
    @HostBinding('class.spy-button-icon--disabled')
    @ToBoolean()
    disabled = false;

    @ViewChild('buttonRef', { static: true }) buttonRef?: ElementRef<HTMLElement>;

    click() {
        this.buttonRef?.nativeElement.click();
    }
}
