import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UnsavedChangesModule } from '@spryker/unsaved-changes';

import { UnsavedChangesBrowserGuard } from './unsaved-changes-browser-guard.service';

@NgModule({
  imports: [CommonModule],
})
export class UnsavedChangesBrowserGuardModule {
  static forRoot(): ModuleWithProviders<UnsavedChangesBrowserGuardModule> {
    return {
      ngModule: UnsavedChangesBrowserGuardModule,
      providers: [
        UnsavedChangesModule.withGuard(UnsavedChangesBrowserGuard).providers ||
          [],
      ],
    };
  }
}
