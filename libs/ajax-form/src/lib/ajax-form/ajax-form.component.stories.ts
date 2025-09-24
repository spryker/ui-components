import { importProvidersFrom } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';
import { AjaxFormModule } from '../ajax-form.module';
import { provideHttpClient } from '@angular/common/http';

export default {
    title: 'AjaxFormComponent',
    decorators: [
        applicationConfig({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(NotificationModule.forRoot()),
            ],
        }),
        moduleMetadata({
            imports: [AjaxFormModule, MockHttpModule],
        }),
    ],
} as Meta;

const mockHtmlTemplate = () => `
  name
  <input type="text" name="name" style="border: 1px solid red">
  <br>
  name1
  <input type="text" name="name1" style="border: 1px solid red">
  <br>
  name2
  <input type="text" name="name2" style="border: 1px solid red">
  <br>
  name3
  <input type="text" name="name3" style="border: 1px solid red">
  <br>
  name4
  <input type="text" name="name4" style="border: 1px solid red">
  <br>
  <button type="submit">Submit</button>
  <button type="submit" name="submit2">Submit #2</button>
`;

function generateMockHtmlPage(): any {
    return { form: mockHtmlTemplate() };
}

export const primary = (args) => ({
    props: {
        ...args,
        action: '/html-request',
        mockHttp: setMockHttp([
            {
                url: '/html-request',
                dataFn: () => generateMockHtmlPage(),
            },
        ]),
    },
    template: `<spy-ajax-form [action]="action" [mockHttp]="mockHttp"></spy-ajax-form>`,
});
