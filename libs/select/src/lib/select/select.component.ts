import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'spy-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent implements OnInit {
  @Input() options: any[] = [];
  @Input() value: string | string[] = '';
  @Input() search = false;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() placeholder = '';
  @Input() showSelectAll = false;
  @Input() selectAllTitle = '';
  @Input() name = '';
  @Output() valueChange = new EventEmitter<string | string[]>();
  allValues: string[] = [];

  ngOnInit() {
    if (this.multiple && !this.value.length) {
      this.value = [];
    }

    this.options = this.options.map((option: any) => {
      const mappedOption =
        typeof option === 'string' || typeof option === 'number'
          ? { value: option, label: option }
          : option;

      this.allValues.push(mappedOption.value);
      return mappedOption;
    });
  }

  handleValueChange(event: any) {
    if (this.multiple && event[event.length - 1] === this.selectAllTitle) {
      this.triggerAvailableSelectAllAction(event);
      return;
    }

    this.valueChange.emit(event);
  }

  triggerAvailableSelectAllAction(event: any) {
    event.length - 1 !== this.allValues.length
      ? this.selectAllOptions()
      : this.declineAllOptions();
  }

  selectAllOptions(): void {
    this.value = [...this.allValues];
  }

  declineAllOptions(): void {
    this.value = [];
  }
}
