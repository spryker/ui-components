import {
  ComponentFactoryResolver,
  Injector,
  NgModule,
  Type,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';

@NgModule({})
export abstract class CustomElementModule {
  protected abstract component: Type<any>;

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    this.register();
  }

  private register() {
    const cfr = this.injector.get(ComponentFactoryResolver);

    const customElement = createCustomElement(this.component, {
      injector: this.injector,
    });

    customElements.define(
      cfr.resolveComponentFactory(this.component).selector,
      customElement,
    );
  }
}
