import { ComponentFactoryResolver, Injector, NgZone } from '@angular/core';

import { createCustomElementFor } from './custom-element-factory';
import { CustomElementOptions } from './custom-element-options';
import { WebComponentDeclaration, WebComponentDefs } from './types';
import { componentDefsToDeclarations, isDeclarationLazy } from './util';

export function registerComponents(
  components: WebComponentDefs,
  injector: Injector,
) {
  const options = injector.get(CustomElementOptions);

  // Initialize all web components within Angular Zone
  // so all change detections are handled by the Angular
  injector.get(NgZone).run(() => initComponents());

  function initComponents() {
    const componentDeclarations = componentDefsToDeclarations(components);

    componentDeclarations.forEach((componentDeclaration) =>
      customElements.define(
        getComponentName(componentDeclaration),
        createCustomElementFor(componentDeclaration, injector, {
          timeoutMs: options.componentTimeoutMs,
        }),
      ),
    );
  }

  function getComponentName(componentDeclaration: WebComponentDeclaration) {
    let name: string;

    if (isDeclarationLazy(componentDeclaration)) {
      name = componentDeclaration.selector;
    } else if (componentDeclaration.selector) {
      name = componentDeclaration.selector;
    } else {
      name = injector
        .get(ComponentFactoryResolver)
        .resolveComponentFactory(componentDeclaration.component).selector;
    }

    return `${options.prefix}${name}`;
  }
}
