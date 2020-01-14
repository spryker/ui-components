import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CustomElementModule, WebComponentsDef } from './custom-element.module';
import { environment } from './environments/environment';
import { ButtonSlotComponent } from './lib/button-slot.component';
import { ButtonComponent } from './lib/button.component';
import { ButtonModule } from './lib/button.module';

@NgModule({
  imports: [BrowserModule, ButtonModule],
})
export class ButtonElementModule extends CustomElementModule {
  protected components: WebComponentsDef = [
    { component: ButtonComponent, exposeAllMethod: true },
    ButtonSlotComponent,
  ];
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(ButtonElementModule, { ngZone: 'noop' })
  .catch(console.error);
