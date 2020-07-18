import {
  ComponentFactoryResolver,
  Injector,
  NgModule,
  NgZone,
} from '@angular/core';

import { createCustomElementFor } from './custom-element-factory';
import { CustomElementOptions } from './custom-element-options';
import { WebComponentDeclaration, WebComponentDefs } from './types';
import { componentDefsToDeclarations, isDeclarationLazy } from './util';

@NgModule({})
export abstract class CustomElementModule {
  protected abstract components: WebComponentDefs;

  private options = this.injector.get(CustomElementOptions);

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // Initialize all web components within Angular Zone
    // so all change detections are handled by the Angular
    this.injector.get(NgZone).run(() => this.initComponents());
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
      createCustomElementFor(componentDeclaration, this.injector, {
        timeoutMs: this.options.componentTimeoutMs,
      }),
    );
  }

  private getComponentName(componentDeclaration: WebComponentDeclaration) {
    let name: string;

    if (isDeclarationLazy(componentDeclaration)) {
      name = componentDeclaration.selector;
    } else if (componentDeclaration.selector) {
      name = componentDeclaration.selector;
    } else {
      name = this.injector
        .get(ComponentFactoryResolver)
        .resolveComponentFactory(componentDeclaration.component).selector;
    }

    return `${this.options.prefix}${name}`;
  }
}
