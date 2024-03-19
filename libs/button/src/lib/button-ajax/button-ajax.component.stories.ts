import { importProvidersFrom } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule, NotificationWrapperComponent } from '@spryker/notification';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonAjaxComponent, ButtonAjaxMethod } from './button-ajax.component';
import { ButtonAjaxModule } from './button-ajax.module';

export default {
    title: 'ButtonAjaxComponent',
    component: ButtonAjaxComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(HttpClientTestingModule),
                importProvidersFrom(NotificationModule.forRoot()),
            ],
        }),
        moduleMetadata({
            imports: [ButtonAjaxModule, MockHttpModule],
            entryComponents: [NotificationWrapperComponent],
        }),
    ],
    parameters: {
        controls: {
            include: ['variant', 'size', 'shape', 'attrs', 'method'],
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
        method: {
            control: { type: 'select' },
            options: ButtonAjaxMethod,
        },
    },
    args: {
        variant: ButtonVariant.Primary,
        size: ButtonSize.Medium,
        shape: ButtonShape.Default,
        method: ButtonAjaxMethod.Get,
        attrs: { name: 'custom-name' },
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        mockHttp: setMockHttp([
            {
                url: '/html-request',
                dataFn: () => `<p>I am your response...</p>`,
            },
        ]),
    },
    template: `
    <spy-button-ajax
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      [attrs]="attrs"
      url="/html-request"
      [method]="method"
      [mockHttp]="mockHttp"
    >Button</spy-button-ajax>
  `,
});
