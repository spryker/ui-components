import { NgModule } from '@angular/core';
import { SpyCoreModule, TestComponent } from '@spryker/core';
import { CustomElementModule, WebComponentDefs } from '@spryker/web-components';

@NgModule({
  imports: [SpyCoreModule],
})
export class TestWebComponentModule extends CustomElementModule {
  protected components: WebComponentDefs = [TestComponent];
}
