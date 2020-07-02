import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  IconArrowDownModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { ToBoolean, ToJson } from '@spryker/utils';

export type SelectValue = string | number;
export type SelectValueSelected = SelectValue | SelectValue[];
export type SelectOption = SelectValue | SelectOptionItem;

export interface SelectOptionItem {
  label: string;
  value: SelectValue;
  isDisabled?: boolean;
}

@Component({
  selector: 'spy-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements OnInit, OnChanges {
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

  @Output() valueChange = new EventEmitter<SelectValueSelected>();

  checkIcon = IconCheckModule.icon;
  arrowDownIcon = IconArrowDownModule.icon;
  removeIcon = IconRemoveModule.icon;

  allValues: SelectValue[] = [];
  mappedOptions: SelectOptionItem[] = [];
  mappedValue?: SelectValueSelected;
  selectAllValue = 'select-all';

  ngOnInit() {
    this.updateOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !changes.options.firstChange) {
      this.updateOptions();
    } else if (changes.value && !changes.value.firstChange) {
      this.updateValue();
    }
  }

  handleValueChange(value: SelectValue | SelectValue[]): void {
    if (Array.isArray(value) && this.isSelectAllAction(value)) {
      value = this.getValueArrayForSelectAllAction(value);
    }

    this.mappedValue = value;
    this.valueChange.emit(value);
  }

  private updateOptions(): void {
    this.mappedOptions =
      this.options?.map(option =>
        typeof option !== 'object'
          ? ({ value: option, label: option } as SelectOptionItem)
          : option,
      ) ?? [];

    this.allValues = this.mappedOptions.map(option => option.value.toString());

    this.updateValue();
  }

  private updateValue() {
    this.mappedValue =
      this.multiple && Array.isArray(this.value)
        ? this.value.filter(value => this.isValueExist(value))
        : this.isValueExist(this.value?.toString())
        ? this.value?.toString()
        : undefined;
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
