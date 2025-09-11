import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
    standalone: false,
    selector: 'spy-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-toggle',
    },
})
export class ToggleComponent {
    @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

    @Input() @ToBoolean() value = false;
    @Input() @ToBoolean() disabled = false;
    @Input() name?: string;
    @Output() valueChange = new EventEmitter<boolean>();

    onChangeHandler(event: boolean): void {
        const inputEvent = new Event('input', { bubbles: true });

        this.valueChange.emit(event);
        this.inputRef?.nativeElement.dispatchEvent(inputEvent);
    }
}
