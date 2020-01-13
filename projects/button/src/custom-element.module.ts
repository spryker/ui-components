import {
  ComponentFactoryResolver,
  Injector,
  NgModule,
  Type,
} from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';

import { getElementMethodsOf } from './custom-element-method';

export interface WebComponentType<T = any> extends Type<T> {
  selector?: string;
}

@NgModule({})
export abstract class CustomElementModule {
  protected abstract components: WebComponentType[];

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    this.init();
  }

  private init() {
    this.components.forEach(component => this.register(component));
  }

  private register(component: WebComponentType) {
    customElements.define(
      this.getComponentName(component),
      createCustomElementFor(component, this.injector),
    );
  }

  private getComponentName(component: WebComponentType) {
    if (component.selector) {
      return component.selector;
    }

    return this.injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(component).selector;
  }
}

function createCustomElementFor(
  componentType: WebComponentType,
  injector: Injector,
) {
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
