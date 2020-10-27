import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { AjaxActionModule } from '@spryker/ajax-action';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';
import { IStory } from '@storybook/angular';

import { StaticHtmlRendererModule } from '../static-html-renderer/static-html-renderer.module';
import { UrlHtmlRendererResponse } from '../url-html-renderer/url-html-renderer.directive';
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

@Injectable({
  providedIn: 'root',
})
class AjaxPostActionMockService {
  constructor() {}

  handleAction(action: any): void {
    // tslint:disable-next-line: no-non-null-assertion
    document.getElementById(
      'test-id',
    )!.innerHTML += `<div>${action.random}</div>`;
  }
}

function generateMockHtmlPage(
  template: string,
  withPost = false,
): UrlHtmlRendererResponse {
  return {
    html: mockHtmlTemplate(template),
    postActions: withPost
      ? [
          {
            type: 'mock',
            random: Math.random().toFixed(4),
          },
        ]
      : [],
  };
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
    imports: [
      UrlHtmlRendererModule,
      MockHttpModule,
      HttpClientTestingModule,
      NotificationModule.forRoot(),
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

export const withUrlHtmlPostActions = (): IStory => ({
  moduleMetadata: {
    imports: [
      UrlHtmlRendererModule,
      MockHttpModule,
      HttpClientTestingModule,
      NotificationModule.forRoot(),
      AjaxActionModule.withActions({
        mock: AjaxPostActionMockService,
      }),
    ],
  },
  template: `
    <spy-html-renderer [mockHttp]="mockHttp" urlHtml="/html-request"></spy-html-renderer>
    <h2 id="test-id"></h2>
  `,
  props: {
    mockHttp: setMockHttp([
      {
        url: '/html-request',
        dataFn: () => generateMockHtmlPage('Url', true),
      },
    ]),
  },
});
