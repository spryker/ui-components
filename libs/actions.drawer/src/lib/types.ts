import { Type, TemplateRef } from '@angular/core';
import { ActionConfig } from '@spryker/actions';
import { DrawerOptionsComponent, DrawerOptionsTemplate, DrawerTemplateContext } from '@spryker/drawer';
import { RegistryType, RegistryDeclaration } from '@spryker/utils';

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
