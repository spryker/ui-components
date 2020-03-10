import {
  Component,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';

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
  @Input() addBefore: string | TemplateRef<void> = '';
  @Input() addAfter: string | TemplateRef<void> = '';
  @Input() name = '';
  @Input() value: any = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() @ToJson() attrs: Record<string, string> = {};
  @Input() spyId = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
}
