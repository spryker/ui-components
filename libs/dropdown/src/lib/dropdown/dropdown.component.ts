import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

interface DropdownItem {
  action: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  subItems?: DropdownItem[];
}
type Placement =
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topLeft'
  | 'topCenter'
  | 'topRight';

@Component({
  selector: 'spy-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() placement: Placement = 'bottomRight';
  @Input() visible = false;
  @Input() disabled = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() actionTriggered = new EventEmitter<string>();
}
