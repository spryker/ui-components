import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { ButtonAjaxMethod } from '../button-core-inputs/types';

import { ButtonAjaxComponent } from './button-ajax.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AjaxFormModule } from '@spryker/ajax-form';
import { NotificationModule } from '@spryker/notification';

// tslint:disable: no-non-null-assertion

describe('ButtonComponent', () => {
  let httpTestingController: HttpTestingController;

  const { testModule, createComponent } = getTestingForComponent(
    ButtonAjaxComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        testModule,
        StaticHtmlRendererModule,
        HttpClientTestingModule,
        AjaxFormModule,
        NotificationModule.forRoot(),
      ],
    }),
  );

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should render <spy-button-ajax>', async () => {
    const host = await createComponent();

    host.detectChanges();

    const buttonElem = host.queryCss('spy-button-ajax');

    expect(buttonElem).toBeTruthy();
  });

  it('should render projected content inside <spy-button-ajax>', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('spy-button-ajax')!;

    host.detectChanges();

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  it('should add appropriate @ButtonAjaxMethod(method) to the `<spy-button-ajax>`', async () => {
    const host = await createComponent(
      {
        method: ButtonAjaxMethod.Post,
      },
      true,
    );

    const buttonElem = host.queryCss('spy-button')!;
    expect(buttonElem.properties.method).toBe(ButtonAjaxMethod.Post);
  });

  it('should add appropriate `url` attribute to the `<spy-button-ajax>`', async () => {
    const host = await createComponent(
      {
        url: '/custom-path',
      },
      true,
    );

    const buttonElem = host.queryCss('spy-button')!;
    expect(buttonElem.properties.url).toBe('/custom-path');
  });

  it('should send request by selected method', async () => {
    const host = await createComponent(
      {
        method: ButtonAjaxMethod.Get,
        url: '/custom-path',
      },
      true,
    );
    host.detectChanges();
    const buttonElem = host.queryCss('spy-button')!;
    buttonElem.triggerEventHandler('click', onclick);

    const htmlResponse = httpTestingController.expectOne('/custom-path');
    expect(htmlResponse.request.method).toBe(ButtonAjaxMethod.Get);
  });
});
