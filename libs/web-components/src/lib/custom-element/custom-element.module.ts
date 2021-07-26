import { Injector, NgModule } from '@angular/core';

import { registerComponents } from './custom-element-registry';
import { WebComponentDefs } from './types';

/**
 * @deprecated Use {WebComponentsModule.withComponents()} static method instead.
 */
@NgModule({})
export abstract class CustomElementModule {
  protected abstract components: WebComponentDefs;

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    registerComponents(this.components, this.injector);
  }
}
