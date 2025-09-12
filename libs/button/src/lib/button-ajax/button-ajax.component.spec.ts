import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NotificationModule } from '@spryker/notification';
import { ButtonShape, ButtonSize, ButtonVariant } from '@spryker/button';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ButtonAjaxComponent, ButtonAjaxMethod } from './button-ajax.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('ButtonAjaxComponent', () => {
    let httpTestingController: HttpTestingController;

    const { testModule, createComponent } = getTestingForComponent(ButtonAjaxComponent, {
        ngModule: {
            imports: [NotificationModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: 'Content',
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [provideHttpClient(), provideHttpClientTesting()],
            teardown: { destroyAfterEach: false },
        });

        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should render <spy-button-ajax>', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('spy-button-ajax');

        expect(buttonElem).toBeTruthy();
    });

    it('should render projected content inside <spy-button-ajax>', async () => {
        const host = await createComponentWrapper(createComponent);
        const buttonElem = host.queryCss('spy-button-ajax');

        expect(buttonElem.nativeElement.textContent).toMatch('Content');
    });

    it('should send request by selected method', async () => {
        const mockPath = '/custom-path';
        const host = await createComponentWrapper(createComponent, {
            method: ButtonAjaxMethod.Get,
            url: mockPath,
        });
        const buttonElem = host.queryCss('spy-button');

        buttonElem.triggerEventHandler('click', null);
        host.detectChanges();

        const htmlResponse = httpTestingController.expectOne(mockPath);

        expect(htmlResponse.request.method).toBe(ButtonAjaxMethod.Get);
    });

    it('should add appropriate @Input(variant), @Input(shape), @Input(size) props to the `<spy-button>`', async () => {
        const mockedAttrs = { mockAttr: 'mockAttr' };
        const host = await createComponentWrapper(createComponent, {
            variant: ButtonVariant.Critical,
            shape: ButtonShape.Circle,
            size: ButtonSize.Large,
            attrs: mockedAttrs,
        });
        const buttonElem = host.queryCss('spy-button');

        expect(buttonElem.properties.variant).toBe(ButtonVariant.Critical);
        expect(buttonElem.properties.size).toBe(ButtonSize.Large);
        expect(buttonElem.properties.shape).toBe(ButtonShape.Circle);
        expect(buttonElem.properties.attrs).toBe(mockedAttrs);
    });

    it('should add loading state after click and remove them after response', async () => {
        const mockPath = '/custom-path';
        const host = await createComponentWrapper(createComponent, {
            method: ButtonAjaxMethod.Get,
            url: mockPath,
        });
        const buttonElem = host.queryCss('spy-button');

        buttonElem.triggerEventHandler('click', null);
        host.detectChanges();

        expect(buttonElem.properties.loading).toBeTruthy();

        const htmlResponse = httpTestingController.expectOne(mockPath);

        htmlResponse.flush({});
        host.detectChanges();

        expect(buttonElem.properties.loading).toBeFalsy();
    });
});
