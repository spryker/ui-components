import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from '@spryker/drawer';
import { RegistryDeclaration } from '@spryker/utils';
import { DrawerActionComponentsRegistry } from './types';
import { provideDrawerActionType } from './token';
// import { ActionsModule } from '@spryker/actions';

@NgModule({
  imports: [CommonModule, DrawerModule],
})
export class DrawerActionModule {
  static withComponents(
    components: RegistryDeclaration<DrawerActionComponentsRegistry>,
  ): ModuleWithProviders<DrawerActionModule> {
    return {
      ngModule: DrawerActionModule,
      providers: [provideDrawerActionType(components)],
    };
  }
}
