import { InputComponent } from './input.component';
import { InputModule } from '../input.module';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  WebComponentsModule,
  CustomElementModule,
  WebComponentDefs,
} from '@spryker/web-components';
import {
  AutocompleteModule,
  AutocompleteComponent,
} from '@spryker/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'InputComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    name: 'some-name',
  },
});

export const withPrefix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    prefix: 'P',
  },
});

export const withOuterPrefix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    outerPrefix: 'prefix',
  },
});

export const withSuffix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    suffix: 'S',
  },
});

export const withOuterSuffix = () => ({
  moduleMetadata: {
    imports: [InputModule],
  },
  component: InputComponent,
  props: {
    outerSuffix: 'suffix',
  },
});

export const autocomplete = () => ({
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
        title:
          'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
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

export const autocompleteAsWebComponents = () => ({
  moduleMetadata: {
    imports: [StoryModule, BrowserAnimationsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-input>
      <web-spy-autocomplete [options]="options"></web-spy-autocomplete>
    </web-spy-input>
  `,
  props: {
    options: JSON.stringify([
      {
        value: 'Burns Bay Road',
        title:
          'Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road Burns Bay Road',
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
    ]),
  },
});
