import { Type, TemplateRef } from '@angular/core';
import { ActionConfig } from '@spryker/actions';
import { DrawerOptionsComponent, DrawerOptionsTemplate, DrawerTemplateContext } from '@spryker/drawer';
import { RegistryType, RegistryDeclaration } from '@spryker/utils';

// tslint:disable-next-line:no-empty-interface
export interface DrawerActionComponentsRegistry {
  // type: Type<unknown>
}

export type DrawerActionComponentType = RegistryType<DrawerActionComponentsRegistry>;

export type DrawerActionTypesDeclaration = RegistryDeclaration<DrawerActionComponentsRegistry>;

export interface DrawerActionConfigComponent extends ActionConfig {
  component: DrawerActionComponentType | Type<unknown>;
  options?: Partial<DrawerOptionsComponent>;
}

export interface DrawerActionConfigTemplate extends ActionConfig {
  template: TemplateRef<DrawerTemplateContext>;
  options?: Partial<DrawerOptionsTemplate>;
}

export type DrawerActionConfig = DrawerActionConfigComponent | DrawerActionConfigTemplate;

// DI multi-token
// type DrawerActionComponentTypesToken = InjectionToken<RegistryDeclaration<DrawerActionComponentsRegistry>[]>;

// @Injectable() class
// interface DrawerActionHandlerService extends ActionHandler<unknown, DrawerRef> {
//   handleAction<C>(injector: Injector, config: DrawerActionConfig, context: C): Observable<DrawerRef<C>>;
// }
//
// interface DrawerActionModule {
//   static withComponents(
//     components: RegistryDeclaration<DrawerActionComponentsRegistry>
//   ): ModuleWithProviders<DrawerActionModule>;
// }
