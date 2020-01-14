import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { ButtonComponent } from './lib/button.component';
import { ButtonModule } from './lib/button.module';
import { CustomElementModule, WebComponentDefs } from './lib/custom-element';

@NgModule({
  imports: [BrowserModule, ButtonModule],
})
export class ButtonElementModule extends CustomElementModule {
  protected components: WebComponentDefs = [
    { component: ButtonComponent, exposeAllMethod: true },
  ];
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(ButtonElementModule, { ngZone: 'noop' })
  .catch(console.error);
