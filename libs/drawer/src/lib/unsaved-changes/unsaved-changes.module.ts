import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { UnsavedChangesGuard } from './guard';
import { provideRootGuard } from './guard-root.token';
import { UnsavedChangesGuardService } from './guard.service';
import { UnsavedChangesGuardToken } from './guard.token';
import { UnsavedChangesFormMonitorDirective } from './monitor-form';
import { InterceptionModule } from '../interception/interception.module';
import { UnsavedChangesDrawerGuardComposableFactory } from './guard-drawer';

@NgModule({
  imports: [CommonModule],
  exports: [UnsavedChangesFormMonitorDirective],
  declarations: [UnsavedChangesFormMonitorDirective],
})
export class UnsavedChangesModule {
  static forRoot(): ModuleWithProviders<UnsavedChangesModule> {
    return {
      ngModule: UnsavedChangesModule,
      providers: [
        {
          provide: UnsavedChangesGuardToken,
          useExisting: UnsavedChangesGuardService,
        },
        InterceptionModule.withComposable(
          UnsavedChangesDrawerGuardComposableFactory,
        ).providers || [],
      ],
    };
  }

  static withGuard(
    guardType: Type<UnsavedChangesGuard>,
  ): ModuleWithProviders<UnsavedChangesModule> {
    return {
      ngModule: UnsavedChangesModule,
      providers: [provideRootGuard(guardType)],
    };
  }
}
