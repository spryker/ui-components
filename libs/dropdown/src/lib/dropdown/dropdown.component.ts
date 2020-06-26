import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { ToBoolean } from '@spryker/utils';

export interface DropdownItem {
  action: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  subItems?: DropdownItem[];
}
export type Placement =
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
  @HostBinding('class.spy-dropdown--open')
  @Input()
  @ToBoolean()
  visible = false;
  @Input() @ToBoolean() disabled = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() actionTriggered = new EventEmitter<string>();

  clickHandler(event: Event): void {
    event.stopPropagation();
  }
}
