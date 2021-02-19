import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Inject,
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
    '[class.spy-user-menu-link--danger]': 'typeDanger',
  },
})
export class UserMenuLinkComponent {
  @Input() type?: UserMenuLinkType = UserMenuLinkType.Default;

  @HostListener('click', ['$event'])
  onClick() {
    this.userMenuComponent?.togglePopover(false);
  }

  constructor(
    @Inject(UserMenuComponent)
    private userMenuComponent?: UserMenuComponent,
  ) {}

  get typeDanger(): boolean {
    return this.type === UserMenuLinkType.Danger;
  }
}
