import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DrawerWrapperModule } from '../drawer-wrapper/drawer-wrapper.module';
import { InterceptionModule } from '../interception/interception.module';
import { DrawerContainerProxyComponent } from './drawer-container-proxy.component';
import {
  DrawerComposerDirective,
  DrawerContainerComponent,
} from './drawer-container.component';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    DrawerWrapperModule,
    InterceptionModule,
  ],
  exports: [InterceptionModule],
  declarations: [
    DrawerContainerComponent,
    DrawerContainerProxyComponent,
    DrawerComposerDirective,
  ],
})
export class DrawerContainerModule {}
