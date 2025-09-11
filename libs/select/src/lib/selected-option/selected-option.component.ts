import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    standalone: false,
    selector: 'spy-selected-option',
    templateUrl: './selected-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedOptionComponent {
    @ViewChild('contentTpl') template!: TemplateRef<void>;
}
