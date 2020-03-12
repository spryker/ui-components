import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
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
}
