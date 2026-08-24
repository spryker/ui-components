import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { AutocompleteWrapper, AutocompleteWrapperToken, ToJson } from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { ReplaySubject } from 'rxjs';

@Component({
    standalone: false,
    selector: 'spy-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: AutocompleteWrapperToken,
            useExisting: InputComponent,
        },
    ],
})
export class InputComponent implements AutocompleteWrapper, OnInit, OnChanges {
    @Input() prefix: string | TemplateRef<void> = '';
    @Input() suffix: string | TemplateRef<void> = '';
    @Input() outerPrefix: string | TemplateRef<void> = '';
    @Input() outerSuffix: string | TemplateRef<void> = '';
    @Input() name?: string;
    @Input() value: any = '';
    @Input() type = 'text';
    @Input() placeholder?: string;
    /**
     * Renders the input as read-only.
     *
     * The template binds this onto the zorro input as lower-case `[readonly]`: since
     * ng-zorro-antd 21 `NzInputDirective` owns a `readonly` signal input whose host binding is
     * `[attr.readonly]="readonly() || null"`, so a camel-cased `[readOnly]` would miss the
     * directive input, land on the DOM property, and then be cleared by that host binding.
     */
    @Input({ transform: booleanAttribute }) readOnly = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) required = false;
    @Input() @ToJson() attrs: Record<string, string> = {};
    @Input() spyId?: string;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    isHovered = false;
    isFocused = false;
    nzAutocompleteComponent?: NzAutocompleteComponent;

    value$ = new ReplaySubject<any>(1);

    ngOnInit(): void {
        this.value$.next(this.value);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.value$.next(this.value);
        }
    }

    onAutocompleteChange(value: string): void {
        this.value$.next(value);
        this.valueChange.emit(value);
    }

    /**
     * ng-zorro-antd 21 replaced `nz-input-group` with `nz-input-wrapper`, whose `nzPrefix`,
     * `nzSuffix`, `nzAddonBefore` and `nzAddonAfter` signal inputs accept `string | undefined`
     * only; templates go through the `[nzInputPrefix]`, `[nzInputSuffix]`, `[nzInputAddonBefore]`
     * and `[nzInputAddonAfter]` content-projection slots instead.
     *
     * These two accessors split each affix value across that pair so the published
     * `string | TemplateRef<void>` contract of this component is unchanged.
     */
    protected asText(value: string | TemplateRef<void>): string | undefined {
        return value instanceof TemplateRef ? undefined : value;
    }

    protected asTemplate(value: string | TemplateRef<void>): TemplateRef<void> | null {
        return value instanceof TemplateRef ? value : null;
    }

    initAutocomplete(nzAutocomplete: unknown): void {
        if (nzAutocomplete instanceof NzAutocompleteComponent) {
            this.nzAutocompleteComponent = nzAutocomplete;
        }
    }
}
