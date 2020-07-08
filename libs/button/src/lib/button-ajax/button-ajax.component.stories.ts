import { boolean, select } from '@storybook/addon-knobs';

import { ButtonAjaxModule } from './button-ajax.module';

import { NotificationWrapperComponent } from '../../../../notification/src/lib/notification-wrapper/notification-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from '@spryker/notification';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';

// tslint:disable: no-non-null-assertion

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
    variant: select(
      'Variant',
      { Primary: 'primary', Secondary: 'secondary', Critical: 'critical' },
      'primary',
    ),
    size: select('Size', { Large: 'lg', Medium: 'md', Small: 'sm' }, 'lg'),
    shape: select(
      'Shape',
      { Default: 'default', Round: 'round', Circle: 'circle' },
      'default',
    ),
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => mockHtmlTemplate(),
      },
    ]),
  },
});
