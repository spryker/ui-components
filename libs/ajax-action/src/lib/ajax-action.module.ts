import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '@spryker/notification';
import { provideAjaxActions } from './tokens';
import { AjaxPostActionsDeclaration } from './types';

@NgModule({
  imports: [CommonModule, NotificationModule.forRoot()],
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
