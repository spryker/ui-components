import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson, ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent {
  @Input() spyId = '';
  @Input() @ToBoolean() checked = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() indeterminate = false;
  @Input() @ToBoolean() required = false;
  @Input() name = '';
  @Input() @ToJson() attrs: Record<string, string> = {};

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();
}
