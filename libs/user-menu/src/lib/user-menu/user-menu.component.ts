import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { IconUserModule } from '@spryker/icon/icons';
import { PopoverPosition } from '@spryker/popover';

@Component({
  selector: 'spy-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-user-menu',
  },
})
export class UserMenuComponent {
  @Input() icon?: string = IconUserModule.icon;

  popoverPosition = PopoverPosition.BottomRight;
  isPopoverOpened = false;
}
