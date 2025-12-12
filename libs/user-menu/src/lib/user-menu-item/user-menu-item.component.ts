import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: false,
    selector: 'spy-user-menu-item',
    templateUrl: './user-menu-item.component.html',
    styleUrls: ['./user-menu-item.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-user-menu-item',
    },
})
export class UserMenuItemComponent {}
