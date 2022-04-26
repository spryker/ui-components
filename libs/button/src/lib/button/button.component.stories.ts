import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WebComponentsModule } from '@spryker/web-components';
import { StorybookModule } from '@spryker/web-components/storybook';
import { Meta } from '@storybook/angular';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonComponent, ButtonType } from './button.component';
import { ButtonModule } from './button.module';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  parameters: {
    controls: {
      include: [
        'variant',
        'size',
        'shape',
        'type',
        'disabled',
        'loading',
        'withIcon',
        'attrs',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9331',
      allowFullscreen: true,
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ButtonVariant,
    },
    size: {
      control: { type: 'select' },
      options: ButtonSize,
    },
    shape: {
      control: { type: 'select' },
      options: ButtonShape,
    },
    type: {
      control: { type: 'select' },
      options: ButtonType,
    },
  },
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Medium,
    shape: ButtonShape.Default,
    type: ButtonType.Button,
    attrs: { name: 'custom-name' },
  },
} as Meta;

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [ButtonModule],
  },
  template: `
    <spy-button
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [type]="type"
      [disabled]="disabled"
      [loading]="loading"
      [attrs]="attrs"
    ><span *ngIf="withIcon" icon>&copy;</span>Button</spy-button>
  `,
});
primary.args = {
  withIcon: false,
};

export const asWebComponent = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      StorybookModule,
      WebComponentsModule.withComponents([ButtonComponent]),
      ButtonModule,
    ],
    entryComponents: [ButtonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  template: `
    <web-spy-storybook>
      <web-spy-button
        [attr.shape]="shape"
        [attr.variant]="variant"
        [attr.size]="size"
        [attr.type]="type"
        [attr.disabled]="disabled"
        [attr.loading]="loading"
        [attr.attrs]="attrs"
      >Button text</web-spy-button>
    </web-spy-storybook>
  `,
});
asWebComponent.args = {
  attrs: '{"name": "custom-name"}',
};
