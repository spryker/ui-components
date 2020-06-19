import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

@Component({
  selector: 'spy-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-toggle',
  },
})
export class ToggleComponent {
  @Input() @ToBoolean() value = false;
  @Input() @ToBoolean() disabled = false;
  @Input() name?: string;
  @Output() valueChange = new EventEmitter<boolean>();
}
