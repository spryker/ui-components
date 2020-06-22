import {
  ComponentFactoryResolver,
  Injector,
  NgModule,
  NgZone,
} from '@angular/core';

import { createCustomElementFor } from './custom-element-factory';
import { WebComponentDeclaration, WebComponentDefs } from './types';
import { componentDefsToDeclarations, isDeclarationLazy } from './util';

@NgModule({})
export abstract class CustomElementModule {
  protected abstract components: WebComponentDefs;

  constructor(private injector: Injector, private ngZone: NgZone) {}

  ngDoBootstrap() {
    // Initialize all web components withing Angular Zone
    // so all change detections are handled by the Angular
    this.ngZone.runGuarded(() => this.initComponents());
  }

  private initComponents() {
    const componentDeclarations = componentDefsToDeclarations(this.components);

    componentDeclarations.forEach(componentDeclaration =>
      this.register(componentDeclaration),
    );
  }

  private register(componentDeclaration: WebComponentDeclaration) {
    customElements.define(
      this.getComponentName(componentDeclaration),
      createCustomElementFor(componentDeclaration, this.injector),
    );
  }

  private getComponentName(componentDeclaration: WebComponentDeclaration) {
    if (isDeclarationLazy(componentDeclaration)) {
      return componentDeclaration.selector;
    }

    if (componentDeclaration.selector) {
      return componentDeclaration.selector;
    }

    return this.injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(componentDeclaration.component).selector;
  }
}
