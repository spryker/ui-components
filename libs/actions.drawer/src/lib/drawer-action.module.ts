import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from '@spryker/drawer';
import { ActionsModule } from '@spryker/actions';
import { DrawerActionTypesDeclaration } from './types';
import { provideDrawerActionType } from './token';

@NgModule({
    imports: [CommonModule, DrawerModule, ActionsModule],
})
export class DrawerActionModule {
    static withComponents(components: DrawerActionTypesDeclaration): ModuleWithProviders<DrawerActionModule> {
        return {
            ngModule: DrawerActionModule,
            providers: [provideDrawerActionType(components)],
        };
    }
}
