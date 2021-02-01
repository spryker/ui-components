import {
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
import { AutocompleteComponent } from '@spryker/autocomplete';
import {
  AutocompleteWrapper,
  AutocompleteWrapperToken,
  ToBoolean,
  ToJson,
} from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { ReplaySubject } from 'rxjs';

@Component({
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

  autocompleteReference = AutocompleteComponent;
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

  initAutocomplete(nzAutocomplete: NzAutocompleteComponent): void {
    this.nzAutocompleteComponent = nzAutocomplete;
  }
}
