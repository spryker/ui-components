import { NgModule } from '@angular/core';
import { SpyCoreModule, TestComponent } from '@spryker-ui/core';
import {
  CustomElementModule,
  WebComponentDefs,
} from '@spryker-ui/web-components';

@NgModule({
  imports: [SpyCoreModule],
})
export class TestWebComponentModule extends CustomElementModule {
  protected components: WebComponentDefs = [TestComponent];
}
