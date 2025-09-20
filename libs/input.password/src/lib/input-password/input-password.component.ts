import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Input,
    TemplateRef,
    Output,
    EventEmitter,
    booleanAttribute,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { IconOpenEyeModule, IconCrossedEyeModule } from '@spryker/icon/icons';

@Component({
    standalone: false,
    selector: 'spy-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'spy-input-password',
    },
})
export class InputPasswordComponent {
    @Input() name?: string;
    @Input() value?: string;
    @Input() spyId = '';
    @Input() placeholder = '';
    @Input() outerPrefix?: string | TemplateRef<void>;
    @Input() outerSuffix?: string | TemplateRef<void>;
    @Input({ transform: booleanAttribute }) readOnly?: boolean;
    @Input({ transform: booleanAttribute }) disabled?: boolean;
    @Input({ transform: booleanAttribute }) required?: boolean;
    @Input() @ToJson() attrs?: Record<string, string>;
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    isPasswordHidden = true;
    type = 'password';
    iconName = IconOpenEyeModule.icon;

    togglePasswordVisibility(): void {
        if (this.disabled) {
            return;
        }

        this.isPasswordHidden = !this.isPasswordHidden;
        this.type = this.isPasswordHidden ? 'password' : 'text';
        this.iconName = this.isPasswordHidden ? IconOpenEyeModule.icon : IconCrossedEyeModule.icon;
    }
}
