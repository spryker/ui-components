import { HtmlRendererModule } from '../html-renderer.module';
import { IStory } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
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

function generateMockHtmlPage(template: string): string {
  return mockHtmlTemplate(template);
}

export default {
  title: 'HtmlRendererComponent',
};

export const withStaticHtml = (): IStory => ({
  moduleMetadata: {
    imports: [HtmlRendererModule, BrowserModule],
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
    imports: [
      HtmlRendererModule,
      MockHttpModule,
      BrowserModule,
      HttpClientTestingModule,
    ],
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
