import { Injector, Type, InjectionToken, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionHandler, ActionConfig } from '@spryker/actions';
import { DrawerRef, DrawerOptionsComponent, DrawerOptionsTemplate, DrawerTemplateContext } from '@spryker/drawer';
import { RegistryType, RegistryDeclaration } from '@spryker/utils';

// tslint:disable-next-line:no-empty-interface
export interface DrawerActionComponentsRegistry {
  // type: Type<unknown>
}

export type DrawerActionComponentType = RegistryType<DrawerActionComponentsRegistry>;

// DI multi-token
// type DrawerActionComponentTypesToken = InjectionToken<RegistryDeclaration<DrawerActionComponentsRegistry>[]>;

export interface DrawerActionConfigComponent extends ActionConfig {
  component: DrawerActionComponentType | Type<unknown>;
  options?: Partial<DrawerOptionsComponent>;
}

export interface DrawerActionConfigTemplate extends ActionConfig {
  template: TemplateRef<DrawerTemplateContext>;
  options?: Partial<DrawerOptionsTemplate>;
}

export type DrawerActionConfig = DrawerActionConfigComponent | DrawerActionConfigTemplate;

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
