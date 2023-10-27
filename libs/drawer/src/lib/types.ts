import { TemplateRef, Type } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { DrawerOptions } from './drawer-options';
import { DrawerRef } from './drawer-ref';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';

export interface DrawerTemplateContext {
    $implicit: DrawerRef;
}

export interface DrawerRecord<D = unknown> {
    options: DrawerOptions;
    overlay: OverlayRef;
    container: DrawerContainerComponent;
    component?: Type<D>;
    template?: TemplateRef<DrawerTemplateContext & D>;
}
