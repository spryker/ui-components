import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

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

    @Input({ transform: booleanAttribute }) value = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input() name?: string;
    @Output() valueChange = new EventEmitter<boolean>();

    onChangeHandler(event: boolean): void {
        const inputEvent = new Event('input', { bubbles: true });

        this.valueChange.emit(event);
        this.inputRef?.nativeElement.dispatchEvent(inputEvent);
    }
}
