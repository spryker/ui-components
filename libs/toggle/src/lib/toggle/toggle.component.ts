import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'spy-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToggleComponent {
  @Input() value = false;
  @Input() disabled = false;
  @Input() name = '';
  @Output() valueChange = new EventEmitter<boolean>();
}
