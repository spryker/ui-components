import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryDeclaration } from '@spryker/utils';
import { ActionsRegistry } from './types';
import { provideActions } from './token';

@NgModule({
  imports: [CommonModule],
})
export class ActionsModule {
  static withActions(
    actions: RegistryDeclaration<ActionsRegistry>,
  ): ModuleWithProviders<ActionsModule> {
    return {
      ngModule: ActionsModule,
      providers: [provideActions(actions)],
    };
  }
}
