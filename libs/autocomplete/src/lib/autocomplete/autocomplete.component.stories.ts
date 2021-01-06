import { AutocompleteModule } from '../autocomplete.module';
import { AutocompleteComponent } from './autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputModule, InputComponent } from '@spryker/input';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  WebComponentsModule,
  CustomElementModule,
  WebComponentDefs,
} from '@spryker/web-components';

export default {
  title: 'AutocompleteComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [AutocompleteModule, BrowserAnimationsModule, InputModule],
  },
  template: `
    <spy-input>
      <spy-autocomplete [options]="options"></spy-autocomplete>
    </spy-input>
  `,
  props: {
    options: [
      {
        value: 'Burns Bay Road',
        title: 'Burns Bay Road',
        isDisabled: false,
      },
      {
        value: 'Downing Street',
        title: 'Downing Street',
        isDisabled: true,
      },
      {
        value: 'Wall Street',
        title: 'Wall Street',
      },
    ],
  },
});

@NgModule({
  imports: [WebComponentsModule.forRoot(), InputModule, AutocompleteModule],
  entryComponents: [InputComponent, AutocompleteComponent],
})
class StoryModule extends CustomElementModule {
  components: WebComponentDefs = [InputComponent, AutocompleteComponent];

  constructor(injector: Injector) {
    super(injector);
    super.ngDoBootstrap();
  }
}

export const asWebComponents = () => ({
  moduleMetadata: {
    imports: [StoryModule, BrowserAnimationsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-input>
      <web-spy-autocomplete options='[{"value":"Burns Bay Road","title":"Burns Bay Road","isDisabled":false},{"value":"Downing Street","title":"Downing Street","isDisabled":true},{"value":"Wall Street","title":"Wall Street"}]'></web-spy-autocomplete>
    </web-spy-input>
  `,
});
