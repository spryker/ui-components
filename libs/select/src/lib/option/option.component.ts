import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
    standalone: false,
    selector: 'spy-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
    @Input() value?: string;
    @Input() title?: string;
    @Input() @ToBoolean() disabled = false;
    @ViewChild('contentTpl') template!: TemplateRef<void>;
}
