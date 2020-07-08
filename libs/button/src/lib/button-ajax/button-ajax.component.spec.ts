import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { ButtonAjaxMethod } from '../button-ajax/button-ajax.component';
import { ButtonAjaxComponent } from './button-ajax.component';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
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
        HttpClientTestingModule,
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

  it('should send request by selected method', async () => {
    const mockPath = '/custom-path';
    const host = await createComponent(
      {
        method: ButtonAjaxMethod.Get,
        url: mockPath,
      },
      true,
    );
    host.detectChanges();
    const buttonElem = host.queryCss('spy-button')!;
    buttonElem.triggerEventHandler('click', onclick);

    const htmlResponse = httpTestingController.expectOne(mockPath);
    expect(htmlResponse.request.method).toBe(ButtonAjaxMethod.Get);
  });
});
