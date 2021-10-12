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
import {
  AutocompleteWrapper,
  AutocompleteWrapperToken,
  ToBoolean,
  ToJson,
} from '@spryker/utils';
import { ReplaySubject } from 'rxjs';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';

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
  @Input() name?: string;
  @Input() value: any = '';
  @Input() type = 'text';
  @Input() placeholder?: string;
  @Input() @ToBoolean() readOnly = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() required = false;
  @Input() @ToJson() attrs: Record<string, string> = {};
  @Input() spyId?: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

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

  initAutocomplete(nzAutocomplete: unknown): void {
    if (nzAutocomplete instanceof NzAutocompleteComponent) {
      this.nzAutocompleteComponent = nzAutocomplete;
    }
  }
}
