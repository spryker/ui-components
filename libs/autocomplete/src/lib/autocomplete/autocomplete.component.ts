import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { AutocompleteValue } from './types';

@Component({
  selector: 'spy-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() @ToJson() options?: AutocompleteValue[];

  @ViewChild(NzAutocompleteComponent, { static: true })
  nzAutocompleteComponent?: NzAutocompleteComponent;
  filteredOptions?: AutocompleteValue[];

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.updateFilteredOptions();
    }
  }

  ngOnInit(): void {
    this.updateFilteredOptions();
  }

  updateFilteredOptions(): void {
    this.filteredOptions = this.options ?? [];
  }

  updateValue(value: string): void {
    this.filteredOptions = this.options?.filter((option) =>
      option.title.toLowerCase().includes(value.toLowerCase()),
    );
  }
}
