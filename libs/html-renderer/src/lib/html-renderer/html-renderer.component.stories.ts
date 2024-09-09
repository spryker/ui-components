import { Meta, moduleMetadata } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { StaticHtmlRendererModule } from '../static-html-renderer/static-html-renderer.module';
import { UrlHtmlRendererModule } from '../url-html-renderer/url-html-renderer.module';

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
    decorators: [
        moduleMetadata({
            imports: [StaticHtmlRendererModule],
        }),
    ],
} as Meta;

export const withStaticHtml = (args) => ({
    props: {
        ...args,
        html: mockHtmlTemplate('Static'),
    },
    template: `
    <spy-html-renderer [html]="html"></spy-html-renderer>
  `,
});

export const withUrlHtml = (args) => ({
    props: {
        ...args,
        mockHttp: setMockHttp([
            {
                url: '/html-request',
                dataFn: () => generateMockHtmlPage('Url'),
            },
        ]),
    },
    applicationConfig: {
        providers: [importProvidersFrom(HttpClientTestingModule)],
    },
    moduleMetadata: {
        imports: [UrlHtmlRendererModule, MockHttpModule],
    },
    template: `
    <spy-html-renderer [mockHttp]="mockHttp" urlHtml="/html-request"></spy-html-renderer>
  `,
});
