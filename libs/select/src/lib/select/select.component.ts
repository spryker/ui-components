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
import { ToJson } from '@spryker/utils';

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
  @Input() @ToJson() options: SelectOption[] = [];
  @Input() value: SelectValue | SelectValue[] = [];
  @Input() search = false;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() placeholder = '';
  @Input() showSelectAll = false;
  @Input() selectAllTitle = '';
  @Input() name = '';
  @Input() noOptionsText = '';
  @Output() valueChange = new EventEmitter<SelectValue | SelectValue[]>();
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
