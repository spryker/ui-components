import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NotificationModule } from '@spryker/notification';
import { ButtonShape, ButtonSize, ButtonVariant } from '@spryker/button';
import { ButtonAjaxComponent, ButtonAjaxMethod } from './button-ajax.component';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('ButtonAjaxComponent', () => {
    let httpTestingController: HttpTestingController;

    const { testModule, createComponent } = getTestingForComponent(ButtonAjaxComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
        projectContent: 'Content',
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule, HttpClientTestingModule, NotificationModule.forRoot()],
            teardown: { destroyAfterEach: false },
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
        buttonElem.triggerEventHandler('click', null);

        const htmlResponse = httpTestingController.expectOne(mockPath);
        expect(htmlResponse.request.method).toBe(ButtonAjaxMethod.Get);
    });

    it('should add appropriate @Input(variant), @Input(shape), @Input(size) props to the `<spy-button>`', async () => {
        const mockedAttrs = { mockAttr: 'mockAttr' };
        const host = await createComponent(
            {
                variant: ButtonVariant.Critical,
                shape: ButtonShape.Circle,
                size: ButtonSize.Large,
                attrs: mockedAttrs,
            },
            true,
        );

        const buttonElem = host.queryCss('spy-button')!;

        expect(buttonElem.properties.variant).toBe(ButtonVariant.Critical);
        expect(buttonElem.properties.size).toBe(ButtonSize.Large);
        expect(buttonElem.properties.shape).toBe(ButtonShape.Circle);
        expect(buttonElem.properties.attrs).toBe(mockedAttrs);
    });

    it('should add loading state after click and remove them after response', async () => {
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
        buttonElem.triggerEventHandler('click', null);
        host.detectChanges();
        expect(buttonElem.properties.loading).toBeTruthy();
        const htmlResponse = httpTestingController.expectOne(mockPath);
        htmlResponse.flush({});
        host.detectChanges();
        expect(buttonElem.properties.loading).toBeFalsy();
    });
});
