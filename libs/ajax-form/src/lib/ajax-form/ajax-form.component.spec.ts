import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { AjaxActionService } from '@spryker/ajax-action';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { AjaxFormComponent } from './ajax-form.component';
import { provideHttpClient } from '@angular/common/http';

const mockFirstHtmlTemplate = `
    <input type="text" name="name" id="name">
    <button type="submit">Submit</button>
    <button type="submit" name="submitter" value="mockSubmit">Submit #2</button>
`;
const mockSecondHtmlTemplate = `<p>Hello World!!!</p>`;
const mockUrl = '/html-request';
const mockFirstResponse = {
    form: mockFirstHtmlTemplate,
};
const mockSecondResponse = {
    form: mockSecondHtmlTemplate,
};

class MockAjaxActionService {
    handle = jest.fn();
}

class MockEvent {
    preventDefault = jest.fn();
}

describe('AjaxFormComponent', () => {
    let httpTestingController: HttpTestingController;

    const { testModule, createComponent } = getTestingForComponent(AjaxFormComponent, {
        ngModule: {
            imports: [StaticHtmlRendererModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: AjaxActionService,
                    useExisting: MockAjaxActionService,
                },
                MockAjaxActionService,
            ],
            teardown: { destroyAfterEach: false },
        });

        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('component should send GET request to get HTML on the initialization stage', async () => {
        await createComponentWrapper(createComponent, { action: mockUrl });

        const htmlResponse = httpTestingController.expectOne(mockUrl);

        expect(htmlResponse.request.method).toBe('GET');
    });

    it('component should not render spy-html-renderer if response doesn`t have form property', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl });
        const htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush({});
        host.detectChanges();
        tick();

        const htmlRendererElem = host.queryCss('spy-html-renderer');

        expect(htmlRendererElem).toBeFalsy();
    }));

    it('component should render loading state nz-spin while request is in progress', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl });
        let nzSpinElem = host.queryCss('.spy-ajax-form-container + nz-spin');

        expect(nzSpinElem).toBeTruthy();

        const htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush(mockFirstResponse);
        host.detectChanges();
        tick();

        nzSpinElem = host.queryCss('.spy-ajax-form-container + nz-spin');

        expect(nzSpinElem).toBeFalsy();
    }));

    it('component should render html that comes as a response', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl });
        const htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush(mockFirstResponse);
        host.detectChanges();
        tick();

        const staticHtml = host.queryCss('spy-html-renderer .spy-html-renderer__content');

        expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);
    }));

    it('component should submit form data and rerender html that comes from response', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl, method: 'POST' });
        const event = new MockEvent();
        const ajaxFormElem = host.queryCss('spy-ajax-form');

        expect(ajaxFormElem).toBeTruthy();

        let htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush(mockFirstResponse);
        host.detectChanges();
        tick();

        const staticHtml = host.queryCss('spy-html-renderer .spy-html-renderer__content');

        expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);

        const formElem = host.queryCss('form');
        const inputElem = host.fixture.nativeElement.querySelector('#name');

        inputElem.value = 'mockValue';
        formElem.triggerEventHandler('submit', event);
        htmlResponse = httpTestingController.expectOne(mockUrl);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(htmlResponse.request.body instanceof FormData).toBeTruthy();
        expect(htmlResponse.request.body.get('name')).toBe('mockValue');

        htmlResponse.flush(mockSecondResponse);
        host.detectChanges();
        tick();

        expect(staticHtml.nativeElement.innerHTML).toBe(mockSecondResponse.form);
    }));

    it('component should submit form via button with name attribute and FormData should contain this name/value', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl, method: 'POST' });
        let httpResponse = httpTestingController.expectOne(mockUrl);

        httpResponse.flush(mockFirstResponse);
        host.detectChanges();
        tick();

        const formElem = host.queryCss('form');
        const submitElem = host.fixture.nativeElement.querySelector('button[name="submitter"]');

        formElem.triggerEventHandler('submit', {
            preventDefault: jest.fn(),
            submitter: submitElem,
        });
        httpResponse = httpTestingController.expectOne(mockUrl);

        expect(httpResponse.request.body instanceof FormData).toBeTruthy();
        expect(httpResponse.request.body.get('submitter')).toBeTruthy();
        expect(httpResponse.request.body.get('submitter')).toBe('mockSubmit');
    }));

    it('if first form was submitted component should render nz-spinner over the current form', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl, method: 'POST' });
        host.detectChanges();
        const event = new MockEvent();
        const ajaxFormElem = host.queryCss('spy-ajax-form');

        expect(ajaxFormElem).toBeTruthy();

        let htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush(mockFirstResponse);
        host.detectChanges();
        tick();

        const formElem = host.queryCss('form');
        const inputElem = host.fixture.nativeElement.querySelector('#name');

        inputElem.value = 'mockValue';
        formElem.triggerEventHandler('submit', event);
        host.detectChanges();
        tick();

        const staticHtml = host.queryCss('spy-html-renderer .spy-html-renderer__content');
        let nzSpinElem = host.queryCss('.spy-ajax-form-container + nz-spin');

        htmlResponse = httpTestingController.expectOne(mockUrl);

        expect(nzSpinElem).toBeTruthy();
        expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);

        htmlResponse.flush(mockSecondResponse);
        host.detectChanges();
        tick();

        nzSpinElem = host.queryCss('.spy-ajax-form-container + nz-spin');

        expect(nzSpinElem).toBeFalsy();
        expect(staticHtml.nativeElement.innerHTML).toBe(mockSecondResponse.form);
    }));

    it('should override `action` and `method` from response', async () => {
        const host = await createComponentWrapper(createComponent, { action: mockUrl });
        const mockResponse = {
            form: mockFirstHtmlTemplate,
            action: '/html-request-2',
            method: 'GET',
        };
        const event = new MockEvent();
        const formElem = host.queryCss('form');

        httpTestingController.expectOne(mockUrl);
        formElem.triggerEventHandler('submit', event);

        let htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush(mockResponse);

        expect(htmlResponse.request.method).toBe('POST');

        formElem.triggerEventHandler('submit', event);
        htmlResponse = httpTestingController.expectOne(mockResponse.action);

        expect(htmlResponse.request.method).toBe(mockResponse.method);
    });
});
