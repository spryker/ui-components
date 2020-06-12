import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DrawerContainerModule } from './drawer-container/drawer-container.module';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  imports: [CommonModule, OverlayModule, DrawerContainerModule],
  exports: [DrawerComponent],
  declarations: [DrawerComponent],
})
export class DrawerModule {}
