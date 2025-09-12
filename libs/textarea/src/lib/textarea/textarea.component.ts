import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';
import { AutoSizeType } from 'ng-zorro-antd/input';

interface TextareaAutoSize extends AutoSizeType { }

@Component({
    standalone: false,
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
    @Input() autoSize: boolean | TextareaAutoSize = true;
    @Output() valueChange = new EventEmitter<any>();
}
