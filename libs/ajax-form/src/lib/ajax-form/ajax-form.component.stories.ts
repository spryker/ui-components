import { AjaxFormComponent } from './ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';
import { NotificationWrapperComponent } from 'libs/notification/src/lib/notification-wrapper/notification-wrapper.component';

export default {
  title: 'AjaxFormComponent',
};

const mockHtmlTemplate = (template: string) => `
  <input type="text" name="name">
  <button type="submit">Submit</button>
`;

function generateMockHtmlPage(template: string): any {
  return { form: mockHtmlTemplate(template) };
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      StaticHtmlRendererModule,
      MockHttpModule,
      HttpClientTestingModule,
      NotificationModule.forRoot(),
    ],
    declarations: [AjaxFormComponent],
    entryComponents: [NotificationWrapperComponent],
  },
  template: `<spy-ajax-form [action]="action" [mockHttp]="mockHttp"></spy-ajax-form>`,
  props: {
    action: '/html-request',
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => generateMockHtmlPage('Url'),
      },
    ]),
  },
});
