import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { provideInterceptionComposerToken } from '@spryker/interception';

import { UnsavedChangesGuard } from './unsaved-changes-guard';
import {
  provideRootGuard,
  UnsavedChangesRootToken,
} from './unsaved-changes-guard-root.token';
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
        ...provideInterceptionComposerToken(UnsavedChangesRootToken),
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
