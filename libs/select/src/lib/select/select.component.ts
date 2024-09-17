import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { DatasourceDependableElement } from '@spryker/datasource.dependable';
import { DatasourceTriggerElement } from '@spryker/datasource.trigger';
import { IconArrowDownModule, IconCheckModule, IconRemoveModule } from '@spryker/icon/icons';
import { I18nService } from '@spryker/locale';
import { ToJson } from '@spryker/utils';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { BehaviorSubject, EMPTY, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchAll, switchMap, takeUntil } from 'rxjs/operators';

import { OptionComponent } from '../option/option.component';
import { SelectedOptionComponent } from '../selected-option/selected-option.component';
import { SelectOption, SelectOptionItem, SelectValue, SelectValueSelected } from './types';

@Component({
    selector: 'spy-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DatasourceTriggerElement,
            useExisting: SelectComponent,
        },
        {
            provide: DatasourceDependableElement,
            useExisting: SelectComponent,
        },
    ],
})
export class SelectComponent
    implements DatasourceTriggerElement, DatasourceDependableElement, OnInit, OnChanges, OnDestroy, AfterViewInit
{
    @ViewChild('selectRef') selectRef?: ElementRef<HTMLSelectElement>;
    @ViewChild('selectContainerRef') selectContainerRef?: NzSelectComponent;

    @Input() @ToJson() options?: SelectOption[];
    @Input() @ToJson() value?: SelectValueSelected;
    @Input({ transform: booleanAttribute }) search = false;
    @Input({ transform: booleanAttribute }) serverSearch = false;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) disabledWhenNoOptions = false;
    @Input({ transform: booleanAttribute }) multiple = false;
    @Input() placeholder: string | TemplateRef<void> = '';
    @Input({ transform: booleanAttribute }) showSelectAll = false;
    @Input() selectAllTitle = '';
    @Input() name = '';
    @Input() noOptionsText = '';
    @Input({ transform: booleanAttribute }) disableClear = false;
    @Input({ transform: booleanAttribute }) tagView = false;
    @Input() @ToJson() datasource?: DatasourceConfig;
    @Input() context?: unknown;
    @Input() customOptionTemplate = false;

    _tags: boolean;
    get tags(): boolean {
        return this._tags;
    }
    @Input({ transform: booleanAttribute }) set tags(value: boolean) {
        if (value) {
            this.multiple = true;
            this._tags = value;
        }
    }

    @Output() valueChange = new EventEmitter<SelectValueSelected>();
    @Output() searchChange = new EventEmitter<string>();
    @Output() tagClick = new EventEmitter<SelectValue>();

    checkIcon = IconCheckModule.icon;
    arrowDownIcon = IconArrowDownModule.icon;
    removeIcon = IconRemoveModule.icon;

    inputEvent = new Event('input', { bubbles: true });
    changeEvent = new Event('change', { bubbles: true });
    allValues: SelectValue[] = [];
    mappedOptions: SelectOptionItem[] = [];
    mappedValue?: SelectValueSelected;
    selectAllValue = 'select-all';
    selectedList: string[] = [];
    allTags: SelectValue[] = [];
    maxTagCount = 0;

    triggerElement$ = new ReplaySubject<HTMLElement>(1);
    mappedValue$ = new ReplaySubject<SelectValueSelected>(1);
    datasourceOptions$ = new ReplaySubject<Observable<SelectOption[]>>(1);
    setNoOptionsText$ = new BehaviorSubject(this.noOptionsText);
    noOptionsText$ = this.setNoOptionsText$.pipe(
        switchMap((noOptionsText) =>
            noOptionsText ? of(noOptionsText) : this.i18nService.translate('select.no-results'),
        ),
    );

    private destroyed$ = new Subject<void>();
    optionReference = OptionComponent;
    selectedOptionReference = SelectedOptionComponent;

    selectedOption$ = new BehaviorSubject<any>(null);

    @ContentChildren(OptionComponent)
    set contentOptions(options: QueryList<OptionComponent>) {
        setTimeout(() => {
            if (this.customOptionTemplate) {
                this.setTemplateOptions(options.toArray());
            }
        });
    }

    @ContentChild(SelectedOptionComponent)
    set contentSelectedOption(option: SelectedOptionComponent) {
        if (option) {
            setTimeout(() => {
                this.selectedOption$.next(option.template);
            });
        }
    }

    constructor(
        private injector: Injector,
        private datasourceService: DatasourceService,
        private i18nService: I18nService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        if (this.tags || this.tagView) {
            this.maxTagCount = Infinity;
        }

        this.updateOptions();
        this.initDatasource();
        this.updateDatasource();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.options && !changes.options.firstChange) {
            this.updateOptions();
        } else if (changes.value && !changes.value.firstChange) {
            this.updateValue();
        }

        if (changes.datasource && !changes.datasource.firstChange) {
            this.updateDatasource();
        }

        if (changes.noOptionsText) {
            this.setNoOptionsText$.next(this.noOptionsText);
        }
    }

    ngAfterViewInit(): void {
        const searchComponent = this.selectContainerRef.nzSelectTopControlComponent?.nzSelectSearchComponent;

        if (searchComponent) {
            this.triggerElement$.next(searchComponent.inputElement.nativeElement);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    getTriggerElement(): Observable<HTMLElement> {
        return this.triggerElement$;
    }

    getValueChanges(): Observable<SelectValueSelected> {
        return this.mappedValue$;
    }

    handleValueChange(value: SelectValue | SelectValue[]): void {
        if (Array.isArray(value) && this.isSelectAllAction(value)) {
            value = this.getValueArrayForSelectAllAction(value);
        }

        if (Array.isArray(value) && this.tags) {
            this.updateSelectWithNewTags(value);
        }

        this.updateTitlesArrayForSelectedValues(value);
        this.emitValueChange(value);
    }

    optionsFound(options: OptionComponent[]) {
        setTimeout(() => {
            this.setTemplateOptions(options);
        });
    }

    selectedOptionFound(options: SelectedOptionComponent[]) {
        this.selectedOption$.next(options[0]?.template);
    }

    private setTemplateOptions(options: OptionComponent[]) {
        this.options = options.map(
            (optionComp) =>
                ({
                    title: optionComp.title,
                    value: optionComp.value,
                    isDisabled: optionComp.disabled,
                    template: optionComp.template,
                }) as SelectOptionItem,
        );
        this.updateOptions();
    }

    onTagClick(event: Event, item: NzOptionComponent): void {
        event.stopPropagation();
        const value = (this.mappedValue as SelectValue[])?.filter((value) => value !== item.nzValue);
        this.emitValueChange(value);
        this.tagClick.emit(item.nzValue);
    }

    handleSearchChange(value: string): void {
        this.searchChange.emit(value);
    }

    onBlur(): void {
        if (!this.mappedValue) {
            this.mappedValue$.next(this.mappedValue);
        }
    }

    private emitValueChange(value: SelectValue | SelectValue[]): void {
        this.mappedValue = value;
        this.valueChange.emit(value);
        // FIXME: This is a workaround for the issue with the native select value emits the previous value
        setTimeout(() => {
            this.selectRef?.nativeElement.dispatchEvent(this.inputEvent);
            this.selectRef?.nativeElement.dispatchEvent(this.changeEvent);
        });
        this.mappedValue$.next(this.mappedValue);
    }

    private initDatasource(): void {
        this.datasourceOptions$.pipe(switchAll(), takeUntil(this.destroyed$)).subscribe((options) => {
            this.value = '';
            this.options = options;
            this.updateOptions();
            this.cdr.detectChanges();
        });
    }

    private updateDatasource(): void {
        const options$ = this.datasource
            ? this.datasourceService?.resolve(this.injector, this.datasource, this.context)
            : EMPTY;

        this.datasourceOptions$.next(options$ as Observable<SelectOption[]>);
    }

    private updateTitlesArrayForSelectedValues(value?: SelectValue | SelectValue[]): void {
        if (!value) {
            return;
        }

        if (Array.isArray(value)) {
            this.selectedList = value.map((_value) => {
                const title = this.mappedOptions.find((option) => option.value === _value)?.title;

                return title ?? String(_value);
            });
        }
    }

    private updateOptions(): void {
        this.mappedOptions = (this.options ?? []).map((option) =>
            typeof option !== 'object' ? ({ value: option, title: String(option) } satisfies SelectOptionItem) : option,
        );

        this.allValues = this.mappedOptions.map((option) => option.value);

        if (this.disabledWhenNoOptions) {
            this.disabled = !this.mappedOptions.length;
        }

        if (this.tags) {
            this.allTags = ((this.value ?? []) as SelectValue[]).filter((value) => !this.allValues.includes(value));

            this.updateSelectWithNewTags();
        }

        this.updateValue();
    }

    private updateValue(): void {
        this.mappedValue =
            this.multiple && Array.isArray(this.value)
                ? this.value.filter((value) => this.isValueExist(value))
                : this.isValueExist(this.value)
                  ? this.value
                  : undefined;

        this.updateTitlesArrayForSelectedValues(this.mappedValue);
    }

    private updateSelectWithNewTags(value?: SelectValue[]): void {
        const _tags =
            value !== undefined
                ? value.filter((value) => !this.isValueExist(value))
                : [...this.allTags, ...(this.serverSearch ? (this.value as SelectValue[]) : [])];
        const tags = [...new Set(_tags)];
        const newTags = tags.filter((tag) => !this.allTags.includes(tag));
        const newValues = tags.filter((tag) => !this.mappedOptions.find((option) => option.value === tag));

        this.allValues = [...newValues, ...this.allValues];
        this.mappedOptions = [...newValues.map((value) => ({ value, title: String(value) })), ...this.mappedOptions];
        this.allTags = [...newTags, ...this.allTags];

        this.updateValue();
    }

    private isValueExist(value?: any): boolean {
        return value !== undefined ? this.allValues.includes(value) : false;
    }

    private isSelectAllAction(value: SelectValue[]): boolean {
        return this.multiple && value.at(-1) === this.selectAllValue;
    }

    private getValueArrayForSelectAllAction(value: SelectValue[]): SelectValue[] {
        return value.length <= this.allValues.length ? [...this.allValues] : [];
    }

    checkSelectedState(value: SelectValue): boolean {
        if (this.mappedValue && Array.isArray(this.mappedValue)) {
            return this.mappedValue.includes(value);
        }

        return value === this.mappedValue;
    }
}
