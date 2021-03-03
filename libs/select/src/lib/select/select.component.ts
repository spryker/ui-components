import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import {
  IconArrowDownModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { I18nService } from '@spryker/locale';
import { ToBoolean, ToJson } from '@spryker/utils';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { map, switchAll, switchMap, takeUntil } from 'rxjs/operators';

import {
  SelectOption,
  SelectOptionItem,
  SelectValue,
  SelectValueSelected,
} from './types';

@Component({
  selector: 'spy-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [DatasourceService],
})
export class SelectComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('selectRef') selectRef?: ElementRef<HTMLInputElement>;

  @Input() @ToJson() options?: SelectOption[];
  @Input() @ToJson() value?: SelectValueSelected;
  @Input() @ToBoolean() search = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() multiple = false;
  @Input() placeholder = '';
  @Input() @ToBoolean() showSelectAll = false;
  @Input() selectAllTitle = '';
  @Input() name = '';
  @Input() noOptionsText = '';
  @Input() @ToBoolean() disableClear = false;
  @Input() datasource?: DatasourceConfig;

  @Output() valueChange = new EventEmitter<SelectValueSelected>();

  checkIcon = IconCheckModule.icon;
  arrowDownIcon = IconArrowDownModule.icon;
  removeIcon = IconRemoveModule.icon;

  allValues: SelectValue[] = [];
  mappedOptions: SelectOptionItem[] = [];
  mappedValue?: SelectValueSelected;
  selectAllValue = 'select-all';
  selectedList: string[] = [];

  datasourceOptions$ = new ReplaySubject<Observable<SelectOption[]>>(1);
  setNoOptionsText$ = new BehaviorSubject(this.noOptionsText);
  noOptionsText$ = this.setNoOptionsText$.pipe(
    switchMap((noOptionsText) =>
      noOptionsText
        ? of(noOptionsText)
        : this.i18nService.translate('select.no-results'),
    ),
  );

  private destroyed$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private datasourceService: DatasourceService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    this.updateOptions();
    this.updateDatasource();

    this.datasourceOptions$
      .pipe(switchAll(), takeUntil(this.destroyed$))
      .subscribe((options) => {
        this.options = options;
        this.updateOptions();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
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

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  handleValueChange(value: SelectValue | SelectValue[]): void {
    if (Array.isArray(value) && this.isSelectAllAction(value)) {
      value = this.getValueArrayForSelectAllAction(value);
    }
    const inputEvent = new Event('input', { bubbles: true });

    this.updateTitlesArrayForSelectedValues(value);
    this.mappedValue = value;
    this.valueChange.emit(value);
    this.selectRef?.nativeElement.dispatchEvent(inputEvent);
  }

  private updateDatasource() {
    // Reset options before invoking datasource
    if (this.datasource) {
      this.options = undefined;
      this.updateOptions();
    }

    const options$ = this.datasource
      ? this.datasourceService
          ?.resolve(this.injector, this.datasource)
          .pipe(map((data) => (data as unknown) as SelectOption[]))
      : EMPTY;

    this.datasourceOptions$.next(options$);
  }

  private updateTitlesArrayForSelectedValues(
    value: SelectValue | SelectValue[],
  ): void {
    if (Array.isArray(value)) {
      this.selectedList = this.mappedOptions
        .filter((option) => value.includes(option.value))
        .map((selectOption) => selectOption.title);
    }
  }

  private updateOptions(): void {
    this.mappedOptions =
      this.options?.map((option) =>
        typeof option !== 'object'
          ? ({ value: option, title: option } as SelectOptionItem)
          : option,
      ) ?? [];

    this.allValues = this.mappedOptions.map((option) => option.value);

    this.updateValue();
  }

  private updateValue() {
    this.mappedValue =
      this.multiple && Array.isArray(this.value)
        ? this.value.filter((value) => this.isValueExist(value))
        : this.isValueExist(this.value)
        ? this.value
        : undefined;

    if (this.mappedValue) {
      this.updateTitlesArrayForSelectedValues(this.mappedValue);
    }
  }

  private isValueExist(value?: any): boolean {
    return value !== undefined ? this.allValues.includes(value) : false;
  }

  private isSelectAllAction(value: SelectValue[]): boolean {
    return this.multiple && value[value.length - 1] === this.selectAllValue;
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
