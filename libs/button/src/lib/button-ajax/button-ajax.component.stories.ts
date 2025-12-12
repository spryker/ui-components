import { importProvidersFrom } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule, NotificationWrapperComponent } from '@spryker/notification';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonAjaxComponent, ButtonAjaxMethod } from './button-ajax.component';
import { ButtonAjaxModule } from './button-ajax.module';
import { provideHttpClient } from '@angular/common/http';

export default {
    title: 'ButtonAjaxComponent',
    component: ButtonAjaxComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(NotificationModule.forRoot()),
            ],
        }),
        moduleMetadata({
            imports: [ButtonAjaxModule, MockHttpModule],
            entryComponents: [NotificationWrapperComponent],
        }),
    ],
    tags: ['autodocs'],
    parameters: {
        controls: {
            include: ['variant', 'size', 'shape', 'attrs', 'method', 'url'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1989%3A9331',
            allowFullscreen: true,
        },
        docs: {
            description: {
                component: 'Button that triggers AJAX requests on click.\n\n**Slots:**\n- Default slot: Button text content\n- `[icon]`: Icon element (optional)',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(ButtonVariant),
            description: 'Visual style of the button (primary, secondary, critical, link, outline, critical-outline)',
            table: {
                type: { summary: 'ButtonVariant' },
                defaultValue: { summary: 'ButtonVariant.Primary' },
                category: 'Inputs',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(ButtonSize),
            description: 'Size of the button (sm, md, lg)',
            table: {
                type: { summary: 'ButtonSize' },
                defaultValue: { summary: 'ButtonSize.Medium' },
                category: 'Inputs',
            },
        },
        shape: {
            control: { type: 'select' },
            options: Object.values(ButtonShape),
            description: 'Shape of the button (default, round, circle)',
            table: {
                type: { summary: 'ButtonShape' },
                defaultValue: { summary: 'ButtonShape.Default' },
                category: 'Inputs',
            },
        },
        method: {
            control: { type: 'select' },
            options: Object.values(ButtonAjaxMethod),
            description: 'HTTP method for the AJAX request (GET, POST, PUT, PATCH, DELETE)',
            table: {
                type: { summary: 'ButtonAjaxMethod' },
                defaultValue: { summary: 'ButtonAjaxMethod.Get' },
                category: 'Inputs',
            },
        },
        url: {
            control: { type: 'text' },
            description: 'URL for the AJAX request',
            table: {
                type: { summary: 'string' },
                category: 'Inputs',
            },
        },
        attrs: {
            control: { type: 'object' },
            description: 'Additional HTML attributes for the button element',
            table: {
                type: { summary: 'Record<string, string>' },
                category: 'Inputs',
            },
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
