import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';

import { UnsavedChangesNavigationGuard } from './unsaved-changes-navigation-guard.service';

@NgModule({
  imports: [CommonModule],
})
export class UnsavedChangesGuardNavigationModule {
  static forRoot(): ModuleWithProviders<UnsavedChangesGuardNavigationModule> {
    return {
      ngModule: UnsavedChangesGuardNavigationModule,
      providers: [
        UnsavedChangesModule.withGuard(UnsavedChangesNavigationGuard)
          .providers || [],
      ],
    };
  }
}
