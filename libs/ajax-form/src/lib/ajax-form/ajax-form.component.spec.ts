import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { AjaxActionService } from '@spryker/ajax-action';

import { AjaxFormModule } from '../ajax-form.module';

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

@Component({
  selector: 'spy-test',
  template: `
    <spy-ajax-form [action]="action" [method]="method"></spy-ajax-form>
  `,
})
class TestComponent {
  action: any;
  method: any;
}

class MockAjaxActionService {
  handle = jest.fn();
}

class MockEvent {
  preventDefault = jest.fn();
}

describe('AjaxFormComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StaticHtmlRendererModule,
        HttpClientTestingModule,
        AjaxFormModule,
      ],
      declarations: [TestComponent],
      providers: [
        { provide: AjaxActionService, useExisting: MockAjaxActionService },
        MockAjaxActionService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('component should send GET request to get HTML on the initialization stage', () => {
    component.action = mockUrl;
    fixture.detectChanges();
    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');
  });

  it('component should not render spy-html-renderer if response doesn`t have form property', fakeAsync(() => {
    component.action = mockUrl;
    fixture.detectChanges();

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush({});

    fixture.detectChanges();
    tick();

    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer'),
    );

    expect(htmlRendererElem).toBeFalsy();
  }));

  it('component should render loading state nz-spin while request is in progress', fakeAsync(() => {
    component.action = mockUrl;
    fixture.detectChanges();

    let nzSpinElem = fixture.debugElement.query(
      By.css('.spy-ajax-form-container + nz-spin'),
    );

    expect(nzSpinElem).toBeTruthy();

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockFirstResponse);

    fixture.detectChanges();
    tick();

    nzSpinElem = fixture.debugElement.query(
      By.css('.spy-ajax-form-container + nz-spin'),
    );

    expect(nzSpinElem).toBeFalsy();
  }));

  it('component should render html that comes as a response', fakeAsync(() => {
    component.action = mockUrl;
    fixture.detectChanges();

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockFirstResponse);

    fixture.detectChanges();
    tick();

    const staticHtml = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );

    expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);
  }));

  it('component should submit form data and rerender html that comes from response', fakeAsync(() => {
    component.action = mockUrl;
    component.method = 'POST';
    fixture.detectChanges();

    const event = new MockEvent();
    const ajaxFormElem = fixture.debugElement.query(By.css('spy-ajax-form'));

    expect(ajaxFormElem).toBeTruthy();

    let htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockFirstResponse);

    fixture.detectChanges();
    tick();

    const staticHtml = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );

    expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);

    const formElem = fixture.debugElement.query(By.css('form'));
    const inputElem = fixture.nativeElement.querySelector('#name');

    inputElem.value = 'mockValue';
    formElem.triggerEventHandler('submit', event);
    htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(htmlResponse.request.body instanceof FormData).toBeTruthy();
    expect(htmlResponse.request.body.get('name')).toBe('mockValue');

    htmlResponse.flush(mockSecondResponse);

    fixture.detectChanges();
    tick();

    expect(staticHtml.nativeElement.innerHTML).toBe(mockSecondResponse.form);
  }));

  it('component should submit form via button with name attribute and FormData should contain this name/value', fakeAsync(() => {
    component.action = mockUrl;
    component.method = 'POST';
    fixture.detectChanges();

    let httpResponse = httpTestingController.expectOne(mockUrl);

    httpResponse.flush(mockFirstResponse);

    fixture.detectChanges();
    tick();

    const formElem = fixture.debugElement.query(By.css('form'));
    const submitElem = fixture.nativeElement.querySelector(
      'button[name="submitter"]',
    );

    formElem.triggerEventHandler('submit', {
      preventDefault: jest.fn(),
      submitter: submitElem,
    });
    httpResponse = httpTestingController.expectOne(mockUrl);

    expect(httpResponse.request.body instanceof FormData).toBeTruthy();
    expect(httpResponse.request.body.get('submitter')).toBeTruthy();
    expect(httpResponse.request.body.get('submitter')).toBe('mockSubmit');
  }));

  it('if first form was submitted component should render nz-spinner over the current form', fakeAsync(() => {
    component.action = mockUrl;
    component.method = 'POST';
    fixture.detectChanges();

    const event = new MockEvent();
    const ajaxFormElem = fixture.debugElement.query(By.css('spy-ajax-form'));

    expect(ajaxFormElem).toBeTruthy();

    let htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockFirstResponse);

    fixture.detectChanges();
    tick();

    const formElem = fixture.debugElement.query(By.css('form'));
    const inputElem = fixture.nativeElement.querySelector('#name');

    inputElem.value = 'mockValue';
    formElem.triggerEventHandler('submit', event);

    fixture.detectChanges();
    tick();

    const staticHtml = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );
    let nzSpinElem = fixture.debugElement.query(
      By.css('.spy-ajax-form-container + nz-spin'),
    );

    htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(nzSpinElem).toBeTruthy();
    expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);

    htmlResponse.flush(mockSecondResponse);

    fixture.detectChanges();
    tick();

    nzSpinElem = fixture.debugElement.query(
      By.css('.spy-ajax-form-container + nz-spin'),
    );

    expect(nzSpinElem).toBeFalsy();
    expect(staticHtml.nativeElement.innerHTML).toBe(mockSecondResponse.form);
  }));

  it('should override `action` and `method` from response', fakeAsync(() => {
    const mockResponse = {
      form: mockFirstHtmlTemplate,
      action: '/html-request-2',
      method: 'GET',
    };
    const event = new MockEvent();
    const formElem = fixture.debugElement.query(By.css('form'));

    component.action = mockUrl;

    fixture.detectChanges();
    tick();

    httpTestingController.expectOne(mockUrl);
    formElem.triggerEventHandler('submit', event);

    let htmlResponse = httpTestingController.expectOne(mockUrl);
    htmlResponse.flush(mockResponse);

    expect(htmlResponse.request.method).toBe('POST');

    formElem.triggerEventHandler('submit', event);
    htmlResponse = httpTestingController.expectOne(mockResponse.action);

    expect(htmlResponse.request.method).toBe(mockResponse.method);
  }));
});
