import {
  ComponentFactoryResolver,
  Injector,
  NgModule,
  Type,
} from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';

import { getElementMethodsOf } from './custom-element-method';

@NgModule({})
export abstract class CustomElementModule {
  protected abstract component: Type<any>;

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    this.register();
  }

  private register() {
    const cfr = this.injector.get(ComponentFactoryResolver);
    const customElementComponent = createCustomElementFor(
      this.component,
      this.injector,
    );

    customElements.define(
      cfr.resolveComponentFactory(this.component).selector,
      customElementComponent,
    );
  }
}

function createCustomElementFor(componentType: Type<any>, injector: Injector) {
  const customElement = createCustomElement(componentType, { injector });
  const elemMethods = getElementMethodsOf(componentType.prototype);

  class CustomElement extends (customElement as any) {
    connectedCallback() {
      super.connectedCallback();
      this.__init();
    }

    private __init() {
      elemMethods.forEach((method: any) => this.__exposeMethod(method));
    }

    private __exposeMethod(method: string) {
      const proto = Object.getPrototypeOf(this);
      const ngComponent = this.ngElementStrategy.componentRef.instance;
      const originalMethod = ngComponent[method];
      const overrideMethod = this[method];

      const externalMethod = overrideMethod || originalMethod;

      const internalMethod = function(...args: any[]) {
        console.log('calling external from internal');
        return externalMethod.apply(this, ...args);
      };

      ngComponent[method] = internalMethod;
      proto[method] = originalMethod;
      this[method] = externalMethod;
    }
  }

  return (CustomElement as any) as NgElementConstructor<any>;
}
