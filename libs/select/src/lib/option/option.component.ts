import { booleanAttribute, ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
    standalone: false,
    selector: 'spy-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent {
    @Input() value?: string;
    @Input() title?: string;
    @Input({ transform: booleanAttribute }) disabled = false;
    @ViewChild('contentTpl') template!: TemplateRef<void>;
}
