import { Component, ViewChild } from '@angular/core';

import { DrawerContainerComponent } from './drawer-container.component';

@Component({
    standalone: false,
    selector: 'spy-drawer-container-proxy',
    template: ` <spy-drawer-container></spy-drawer-container> `,
})
export class DrawerContainerProxyComponent {
    @ViewChild(DrawerContainerComponent, { static: true })
    container!: DrawerContainerComponent;
}
