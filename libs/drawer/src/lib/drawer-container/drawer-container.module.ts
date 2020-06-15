import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DrawerContainerComponent } from './drawer-container.component';
import { DrawerWrapperModule } from '../drawer-wrapper/drawer-wrapper.module';

@NgModule({
  imports: [CommonModule, DrawerWrapperModule, PortalModule],
  exports: [DrawerContainerComponent],
  declarations: [DrawerContainerComponent],
})
export class DrawerContainerModule {}
