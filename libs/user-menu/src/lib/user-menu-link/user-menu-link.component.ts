import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  HostListener,
} from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';

export enum UserMenuLinkType {
  Default = 'default',
  Danger = 'danger',
}

@Component({
  selector: 'spy-user-menu-link',
  templateUrl: './user-menu-link.component.html',
  styleUrls: ['./user-menu-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-user-menu-link',
    '[class.spy-user-menu-link--danger]': 'isTypeDanger',
  },
})
export class UserMenuLinkComponent {
  @Input() type?: UserMenuLinkType = UserMenuLinkType.Default;

  @HostListener('click', ['$event'])
  onClick(): void {
    this.userMenuComponent.togglePopover(false);
  }

  constructor(private userMenuComponent: UserMenuComponent) {}

  get isTypeDanger(): boolean {
    return this.type === UserMenuLinkType.Danger;
  }
}
