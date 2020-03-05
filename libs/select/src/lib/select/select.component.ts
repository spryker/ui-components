import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

type SelectValue = string | number;
type SelectOption = SelectValue | SelectOptionItem;

interface SelectOptionItem {
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
  @Input() options: SelectOption[] = [];
  @Input() value: SelectValue[] = [];
  @Input() search = false;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() placeholder = '';
  @Input() showSelectAll = false;
  @Input() selectAllTitle = '';
  @Input() name = '';
  @Input() noOptionsText = '';
  @Output() valueChange = new EventEmitter<SelectValue[]>();
  allValues: SelectValue[] = [];
  mappedOptions: SelectOptionItem[] = [];
  selectAllValue = 'select-all';

  ngOnInit() {
    this.mapOptionsArray(this.options);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options.firstChange) return;

    this.mapOptionsArray(this.options);
  }

  mapOptionsArray(options: SelectOption[]): void {
    options.forEach(option => {
      const convertedOption: any =
        typeof option !== 'object' ? { value: option, label: option } : option;

      this.allValues.push(convertedOption.value);
      this.mappedOptions.push(convertedOption);
    });
  }

  handleValueChange(value: SelectValue[]) {
    if (this.isSelectAllAction(value[value.length - 1])) {
      value = this.getValueArrayForSelectAllAction(value);
    }

    this.value = value;
    this.valueChange.emit(value);
  }

  isSelectAllAction(value: SelectValue): boolean {
    return this.multiple && value === this.selectAllValue;
  }

  getValueArrayForSelectAllAction(value: SelectValue[]): SelectValue[] {
    return value.pop() && value.length !== this.allValues.length
      ? this.selectAllOptions()
      : this.deselectAllOptions();
  }

  selectAllOptions(): SelectValue[] {
    return [...this.allValues];
  }

  deselectAllOptions(): SelectValue[] {
    return [];
  }
}
