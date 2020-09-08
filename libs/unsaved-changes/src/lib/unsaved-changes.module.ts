import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { UnsavedChangesGuard } from './types';
import { provideRootGuard } from './unsaved-changes-guard-root.token';
import { UnsavedChangesGuardService } from './unsaved-changes-guard.service';
import { UnsavedChangesGuardToken } from './unsaved-changes-guard.token';

@NgModule({
  imports: [CommonModule],
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
