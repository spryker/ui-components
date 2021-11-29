import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WebComponentsModule } from '@spryker/web-components';
import { ButtonModule, ButtonComponent } from '@spryker/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    WebComponentsModule.forRoot(),
    WebComponentsModule.withComponents([
      { component: ButtonComponent, isRoot: true },
    ]),
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
