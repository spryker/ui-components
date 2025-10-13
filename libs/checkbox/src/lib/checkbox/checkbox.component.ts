import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';

@Component({
    standalone: false,
    selector: 'spy-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent {
    @Input() spyId?: string;
    @Input({ transform: booleanAttribute }) checked = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) indeterminate = false;
    @Input({ transform: booleanAttribute }) required = false;
    @Input() name?: string;
    @Input() @ToJson() attrs: Record<string, string> = {};

    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();
}
