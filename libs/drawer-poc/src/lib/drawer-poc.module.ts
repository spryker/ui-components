import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerWrapperComponent } from './drawer-wrapper/drawer-wrapper.component';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [DrawerComponent, DrawerWrapperComponent, DrawerContainerComponent],
  declarations: [
    DrawerComponent,
    DrawerWrapperComponent,
    DrawerContainerComponent,
  ],
})
export class DrawerPocModule {}
