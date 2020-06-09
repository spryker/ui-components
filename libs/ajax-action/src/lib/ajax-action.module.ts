import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NotificationModule } from '@spryker/notification';

import { provideAjaxActions } from './tokens';
import { AjaxPostActionsDeclaration } from './types';

@NgModule({
  imports: [CommonModule, NotificationModule],
})
export class AjaxActionModule {
  static withActions(
    actions: AjaxPostActionsDeclaration,
  ): ModuleWithProviders<AjaxActionModule> {
    return {
      ngModule: AjaxActionModule,
      providers: [provideAjaxActions(actions)],
    };
  }
}
