import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';

@Component({
  selector: 'spy-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextareaComponent {
  @Input() name = '';
  @Input() value = '';
  @Input() @ToBoolean() disabled = false;
  @Input() placeholder = '';
  @Input() rows = 4;
  @Input() cols = 4;
  @Input() @ToJson() attrs: Record<string, string> = {};
  @Input() spyId = '';
  @Output() valueChange = new EventEmitter<any>();
}
