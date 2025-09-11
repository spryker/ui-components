import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

import { ButtonCore } from '../button-core/button-core';
import { SpinnerSize } from '@spryker/spinner';

export enum ButtonType {
    Button = 'button',
    Submit = 'submit',
}

@Component({
    standalone: false,
    selector: 'spy-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonCore implements OnChanges {
    @Input() type: ButtonType = ButtonType.Button;
    @Input()
    @HostBinding('class.spy-button--disabled')
    @ToBoolean()
    disabled = false;
    @Input() @ToBoolean() loading?: boolean;

    spinnerSize = SpinnerSize.Small;

    protected buttonClassName = 'spy-button';

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if ('type' in changes) {
            this.type = changes.type.currentValue ?? ButtonType.Button;
        }
    }
}
