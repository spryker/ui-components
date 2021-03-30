import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import {
  CustomElementModule,
  WebComponentDefs,
  WebComponentsModule,
} from '@spryker/web-components';

import { RadioModule } from '../radio.module';
import { RadioComponent } from '../radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';

export default {
  title: 'RadioGroupComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [RadioModule],
  },
  template: `
    <spy-radio-group [value]="'A'">
      <spy-radio [value]="'A'">Label A</spy-radio>
      <spy-radio [value]="'B'">Label B</spy-radio>
    </spy-radio-group>
  `,
});

@NgModule({
  imports: [WebComponentsModule.forRoot(), RadioModule],
  entryComponents: [RadioGroupComponent, RadioComponent],
})
class StoryModule extends CustomElementModule {
  components: WebComponentDefs = [RadioGroupComponent, RadioComponent];

  constructor(injector: Injector) {
    super(injector);
    super.ngDoBootstrap();
  }
}

export const asWebComponents = () => ({
  moduleMetadata: {
    imports: [StoryModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-radio-group value="A">
      <web-spy-radio value="A">Label A</web-spy-radio>
      <web-spy-radio value="B">Label B</web-spy-radio>
    </web-spy-radio-group>
  `,
});
