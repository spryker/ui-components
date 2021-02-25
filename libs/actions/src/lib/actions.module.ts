import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionTypesDeclaration } from './types';
import { provideActions } from './token';

@NgModule({
  imports: [CommonModule],
})
export class ActionsModule {
  static withActions(
    actions: ActionTypesDeclaration,
  ): ModuleWithProviders<ActionsModule> {
    return {
      ngModule: ActionsModule,
      providers: [provideActions(actions)],
    };
  }
}
