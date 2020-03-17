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
  IconCheckboxCheckedModule,
  IconCheckboxUncheckedModule,
  IconCheckModule,
  IconRemoveModule,
} from '@spryker/icon/icons';
import { ToBoolean, ToJson } from '@spryker/utils';

export type SelectValue = string | number;
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
  @Input() @ToJson() options: SelectOption[] = [];
  @Input() value: SelectValue | SelectValue[] = [];
  @Input() @ToBoolean() search = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() multiple = false;
  @Input() placeholder = '';
  @Input() @ToBoolean() showSelectAll = false;
  @Input() selectAllTitle = '';
  @Input() name = '';
  @Input() noOptionsText = '';
  @Output() valueChange = new EventEmitter<SelectValue | SelectValue[]>();

  checkIcon = IconCheckModule.icon;
  arrowDownIcon = IconArrowDownModule.icon;
  removeIcon = IconRemoveModule.icon;
  checkboxCheckedIcon = IconCheckboxCheckedModule.icon;
  checkboxUncheckedIcon = IconCheckboxUncheckedModule.icon;

  allValues: SelectValue[] = [];
  mappedOptions: SelectOptionItem[] = [];
  selectAllValue = 'select-all';

  ngOnInit() {
    this.mapOptionsArray(this.options);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options?.firstChange) return;

    this.mapOptionsArray(this.options);
  }

  mapOptionsArray(options: SelectOption[]): void {
    this.mappedOptions = options.map((option: any) => {
      return typeof option !== 'object'
        ? { value: option, label: option }
        : option;
    });

    this.allValues = this.mappedOptions.map(option => option.value);
  }

  handleValueChange(value: SelectValue | SelectValue[]): void {
    if (Array.isArray(value) && this.isSelectAllAction(value)) {
      value = this.getValueArrayForSelectAllAction(value);
    }

    this.value = value;
    this.valueChange.emit(value);
  }

  isSelectAllAction(value: SelectValue[]): boolean {
    return this.multiple && value[value.length - 1] === this.selectAllValue;
  }

  getValueArrayForSelectAllAction(value: SelectValue[]): SelectValue[] {
    return value.length <= this.allValues.length ? [...this.allValues] : [];
  }
}
