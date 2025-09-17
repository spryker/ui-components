import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { AjaxActionService } from '@spryker/ajax-action';
import { AjaxFormComponent } from './ajax-form.component';

const mockFirstHtmlTemplate = `
  <input type="text" name="name" id="name">
  <button type="submit">Submit</button>
  <button type="submit" name="submitter" value="mockSubmit">Submit #2</button>
`;
const mockSecondHtmlTemplate = `<p>Hello World!!!</p>`;
const mockUrl = '/html-request';
const mockFirstResponse = { form: mockFirstHtmlTemplate };
const mockSecondResponse = { form: mockSecondHtmlTemplate };

class MockAjaxActionService {
    handle = jest.fn();
}

class MockEvent {
    preventDefault = jest.fn();
}

describe('AjaxFormComponent', () => {
    let fixture: ComponentFixture<AjaxFormComponent>;
    let component: AjaxFormComponent;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AjaxFormComponent],
            imports: [StaticHtmlRendererModule],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: AjaxActionService, useExisting: MockAjaxActionService },
                MockAjaxActionService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('component should send GET request to get HTML on the initialization stage', () => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.detectChanges();

        const htmlResponse = httpTestingController.expectOne(mockUrl);
        expect(htmlResponse.request.method).toBe('GET');
    });

    it('component should not render spy-html-renderer if response doesn`t have form property', fakeAsync(() => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.detectChanges();

        const htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush({});
        fixture.detectChanges();
        tick();

        const htmlRendererElem = fixture.debugElement.query(By.css('spy-html-renderer'));
        expect(htmlRendererElem).toBeFalsy();
    }));

    it('component should render loading state nz-spin while request is in progress', fakeAsync(() => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.detectChanges();

        // loading visible before response
        let nzSpinElem = fixture.nativeElement.querySelector('.spy-ajax-form-container + nz-spin');
        expect(nzSpinElem).toBeTruthy();

        const htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush(mockFirstResponse);
        fixture.detectChanges();
        tick();

        nzSpinElem = fixture.nativeElement.querySelector('.spy-ajax-form-container + nz-spin');
        expect(nzSpinElem).toBeFalsy();
    }));

    it('component should render html that comes as a response', fakeAsync(() => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.detectChanges();

        const htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush(mockFirstResponse);
        fixture.detectChanges();
        tick();

        const staticHtml: HTMLElement = fixture.nativeElement.querySelector('spy-html-renderer .spy-html-renderer__content');
        expect(staticHtml.innerHTML).toBe(mockFirstResponse.form);
    }));

    it('component should submit form data and rerender html that comes from response', fakeAsync(() => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.componentRef.setInput('method', 'POST');
        fixture.detectChanges();

        // initial GET
        let htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush(mockFirstResponse);
        fixture.detectChanges();
        tick();

        const staticHtml: HTMLElement = fixture.nativeElement.querySelector('spy-html-renderer .spy-html-renderer__content');
        expect(staticHtml.innerHTML).toBe(mockFirstResponse.form);

        const formDe = fixture.debugElement.query(By.css('form'));
        const inputElem: HTMLInputElement = fixture.nativeElement.querySelector('#name');

        inputElem.value = 'mockValue';
        const event = new MockEvent();
        formDe.triggerEventHandler('submit', event);

        htmlResponse = httpTestingController.expectOne(mockUrl);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(htmlResponse.request.body instanceof FormData).toBeTruthy();
        expect((htmlResponse.request.body as FormData).get('name')).toBe('mockValue');

        htmlResponse.flush(mockSecondResponse);
        fixture.detectChanges();
        tick();

        expect(staticHtml.innerHTML).toBe(mockSecondResponse.form);
    }));

    it('component should submit form via button with name attribute and FormData should contain this name/value', fakeAsync(() => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.componentRef.setInput('method', 'POST');
        fixture.detectChanges();

        let httpResponse = httpTestingController.expectOne(mockUrl);
        httpResponse.flush(mockFirstResponse);
        fixture.detectChanges();
        tick();

        const formDe = fixture.debugElement.query(By.css('form'));
        const submitElem: HTMLButtonElement = fixture.nativeElement.querySelector('button[name="submitter"]');

        formDe.triggerEventHandler('submit', {
            preventDefault: jest.fn(),
            submitter: submitElem,
        });

        httpResponse = httpTestingController.expectOne(mockUrl);
        expect(httpResponse.request.body instanceof FormData).toBeTruthy();
        const fd = httpResponse.request.body as FormData;
        expect(fd.get('submitter')).toBeTruthy();
        expect(fd.get('submitter')).toBe('mockSubmit');
    }));

    it('if first form was submitted component should render nz-spinner over the current form', fakeAsync(() => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.componentRef.setInput('method', 'POST');
        fixture.detectChanges();

        // initial GET
        let htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush(mockFirstResponse);
        fixture.detectChanges();
        tick();

        const formDe = fixture.debugElement.query(By.css('form'));
        const inputElem: HTMLInputElement = fixture.nativeElement.querySelector('#name');

        inputElem.value = 'mockValue';
        formDe.triggerEventHandler('submit', new MockEvent());
        fixture.detectChanges();
        tick();

        const staticHtml: HTMLElement = fixture.nativeElement.querySelector('spy-html-renderer .spy-html-renderer__content');
        let nzSpinElem = fixture.nativeElement.querySelector('.spy-ajax-form-container + nz-spin');

        htmlResponse = httpTestingController.expectOne(mockUrl);

        expect(nzSpinElem).toBeTruthy();
        expect(staticHtml.innerHTML).toBe(mockFirstResponse.form);

        htmlResponse.flush(mockSecondResponse);
        fixture.detectChanges();
        tick();

        nzSpinElem = fixture.nativeElement.querySelector('.spy-ajax-form-container + nz-spin');
        expect(nzSpinElem).toBeFalsy();
        expect(staticHtml.innerHTML).toBe(mockSecondResponse.form);
    }));

    it('should override `action` and `method` from response', () => {
        fixture = TestBed.createComponent(AjaxFormComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('action', mockUrl);
        fixture.detectChanges();

        const mockResponse = {
            form: mockFirstHtmlTemplate,
            action: '/html-request-2',
            method: 'GET' as const,
        };

        // initial GET
        httpTestingController.expectOne(mockUrl);

        const formDe = fixture.debugElement.query(By.css('form'));
        const event = new MockEvent();

        // first submit -> still posts to initial action
        formDe.triggerEventHandler('submit', event);
        let htmlResponse = httpTestingController.expectOne(mockUrl);
        htmlResponse.flush(mockResponse);
        expect(htmlResponse.request.method).toBe('POST');

        fixture.detectChanges();

        // second submit -> should use overridden action/method
        formDe.triggerEventHandler('submit', event);
        htmlResponse = httpTestingController.expectOne(mockResponse.action);
        expect(htmlResponse.request.method).toBe(mockResponse.method);
    });
});
