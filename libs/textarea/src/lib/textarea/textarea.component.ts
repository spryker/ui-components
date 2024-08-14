import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';

@Component({
    selector: 'spy-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent {
    @Input() name?: string;
    @Input() value = '';
    @Input() @ToBoolean() disabled = false;
    @Input() placeholder?: string;
    @Input() rows = 4;
    @Input() cols = 4;
    @Input() @ToJson() attrs: Record<string, string> = {};
    @Input() spyId?: string;
    @Input() autoSize: boolean | { minRows: number, maxRows: number } = true;
    @Output() valueChange = new EventEmitter<any>();
}
