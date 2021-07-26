import { StaticHtmlRendererModule } from '../static-html-renderer/static-html-renderer.module';
import { UrlHtmlRendererModule } from '../url-html-renderer/url-html-renderer.module';
import { IStory } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';

const mockHtmlTemplate = (template: string) => `
  <head>
    <style>
      h1 {
        color: red;
        font-size: 30px;
        font-weight: 700;
      }
      p {
        margin: 10px 0;
        font-weight: 500;
        font-size: 18px;
        color: black;
      }
      a {
        color: green;
        font-style: italic;
      }
      a:hover {
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <h1>${template} HTML HEAD H1</h1>
    <p>Hello World!!!</p>
    <a href="https://www.google.com" target="_blank">Google link</a>
  </body>
`;

function generateMockHtmlPage(template: string): { html: string } {
  return { html: mockHtmlTemplate(template) };
}

export default {
  title: 'HtmlRendererComponent',
};

export const withStaticHtml = (): IStory => ({
  moduleMetadata: {
    imports: [StaticHtmlRendererModule],
  },
  template: `
    <spy-html-renderer [html]="html"></spy-html-renderer>
  `,
  props: {
    html: mockHtmlTemplate('Static'),
  },
});

export const withUrlHtml = (): IStory => ({
  moduleMetadata: {
    imports: [UrlHtmlRendererModule, MockHttpModule, HttpClientTestingModule],
  },
  template: `
    <spy-html-renderer [mockHttp]="mockHttp" urlHtml="/html-request"></spy-html-renderer>
  `,
  props: {
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => generateMockHtmlPage('Url'),
      },
    ]),
  },
});
