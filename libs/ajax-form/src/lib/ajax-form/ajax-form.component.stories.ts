import { AjaxFormComponent } from './ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';

export default {
  title: 'AjaxFormComponent',
};

const mockHtmlTemplate = () => `
  <input type="text" name="name">
  <button type="submit">Submit</button>
`;

function generateMockHtmlPage(): any {
  return { form: mockHtmlTemplate() };
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
  },
  template: `<spy-ajax-form [action]="action" [mockHttp]="mockHttp"></spy-ajax-form>`,
  props: {
    action: '/html-request',
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => generateMockHtmlPage(),
      },
    ]),
  },
});
