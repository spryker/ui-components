import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AutocompleteComponent } from '@spryker/autocomplete';
import { ToBoolean, ToJson } from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';

@Component({
  selector: 'spy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements AfterContentChecked, AfterContentInit {
  @Input() prefix: string | TemplateRef<void> = '';
  @Input() suffix: string | TemplateRef<void> = '';
  @Input() outerPrefix: string | TemplateRef<void> = '';
  @Input() outerSuffix: string | TemplateRef<void> = '';
  @Input() name = '';
  @Input() value: any = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() @ToBoolean() readOnly = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() required = false;
  @Input() @ToJson() attrs: Record<string, string> = {};
  @Input() spyId = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChild(AutocompleteComponent)
  autocompleteComponent?: AutocompleteComponent;

  autocompleteReference = AutocompleteComponent;
  isHovered = false;
  isFocused = false;
  nzAutocompleteComponent?: NzAutocompleteComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.nzAutocompleteComponent = this.autocompleteComponent?.nzAutocompleteComponent;
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  autocompletesFound(autocompletes: AutocompleteComponent[]): void {
    this.autocompleteComponent = autocompletes[0];
    this.nzAutocompleteComponent = autocompletes[0]?.nzAutocompleteComponent;
  }

  onAutocompleteChange(value: string): void {
    if (this.autocompleteComponent) {
      this.autocompleteComponent.filteredOptions = this.autocompleteComponent?.options?.filter(
        (option) => option.title.toLowerCase().includes(value.toLowerCase()),
      );
    }

    this.valueChange.emit(value);
  }
}
