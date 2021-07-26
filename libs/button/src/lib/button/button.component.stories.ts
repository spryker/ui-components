import { WebComponentsModule } from '@spryker/web-components';
import { boolean, select, object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export default {
  title: 'ButtonComponent',
  parameters: {
    abstract: {
      url:
        'https://share.goabstract.com/06fcce27-bd5a-4151-92ab-64e49b8d5001?collectionLayerId=0dbe2190-2585-4964-94d5-13a746765cbd&mode=design',
    },
  },
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ButtonModule],
  },
  template: `
    <spy-button
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [attrs]="attrs"
    ><span *ngIf="withIcon" icon>&copy;</span>Button</spy-button>
  `,
  props: {
    variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
    size: select('Size', ButtonSize, ButtonSize.Large),
    shape: select('Shape', ButtonShape, ButtonShape.Default),
    disabled: boolean('Disabled', false),
    loading: boolean('Loading', false),
    withIcon: boolean('With icon', false),
    attrs: object('Attrs', {}),
  },
});

export const asWebComponent = (): IStory => {
  return {
    moduleMetadata: {
      imports: [
        WebComponentsModule.forRoot(),
        WebComponentsModule.withComponents([
          { component: ButtonComponent, isRoot: true },
        ]),
        ButtonModule,
      ],
      entryComponents: [ButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
    template: `
      <web-spy-button>Button text</web-spy-button>
    `,
  };
};
