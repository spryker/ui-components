import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import {
  NotificationModule,
  NotificationWrapperComponent,
} from '@spryker/notification';
import { select } from '@storybook/addon-knobs';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonAjaxModule } from './button-ajax.module';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export default {
  title: 'ButtonAjaxComponent',
};

const mockHtmlTemplate = () => `
    <p>Luke, I am you response...</p>
`;

export const primary = () => ({
  moduleMetadata: {
    imports: [
      ButtonAjaxModule,
      HttpClientTestingModule,
      BrowserAnimationsModule,
      NotificationModule.forRoot(),
      MockHttpModule,
    ],
    declaration: [NotificationWrapperComponent],
    entryComponents: [NotificationWrapperComponent],
  },
  template: `
    <spy-button-ajax
      [shape]="shape"
      [variant]="variant"
      [size]="size"
      url="/html-request"
      method="GET"
      [mockHttp]="mockHttp"
    >Button</spy-button-ajax>
  `,
  props: {
    variant: select('Variant', ButtonVariant, ButtonVariant.Primary),
    size: select('Size', ButtonSize, ButtonSize.Large),
    shape: select('Shape', ButtonShape, ButtonShape.Default),
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => mockHtmlTemplate(),
      },
    ]),
  },
});
