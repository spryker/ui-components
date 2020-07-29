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

import { NotificationModule } from '@spryker/notification';

import { AjaxFormModule } from '../ajax-form.module';
import { AjaxActionService } from '@spryker/ajax-action';

const mockFirstHtmlTemplate = `
  <input type="text" name="name" id="name">
  <button type="submit">Submit</button>
`;
const mockSecondHtmlTemplate = `<p>Hello World!!!</p>`;
const mockFirstResponse = {
  form: mockFirstHtmlTemplate,
};
const mockSecondResponse = {
  form: mockSecondHtmlTemplate,
};
const mockUrl = '/html-request';

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
        NotificationModule.forRoot(),
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

  it('component should not render form if response doesn`t have form property', fakeAsync(() => {
    component.action = mockUrl;
    fixture.detectChanges();

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush({});

    tick();
    fixture.detectChanges();

    const formElem = fixture.debugElement.query(By.css('form'));

    expect(formElem).toBeFalsy();
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

    tick();
    fixture.detectChanges();

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

    tick();
    fixture.detectChanges();

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

    tick();
    fixture.detectChanges();

    const staticHtml = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );

    expect(staticHtml.nativeElement.innerHTML).toBe(mockFirstResponse.form);

    tick();
    fixture.detectChanges();

    const formElem = fixture.debugElement.query(By.css('form'));

    const inputElem = fixture.nativeElement.querySelector('#name');

    inputElem.value = 'mockValue';

    formElem.triggerEventHandler('submit', event);

    htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(htmlResponse.request.body instanceof FormData).toBeTruthy();
    expect(htmlResponse.request.body.get('name')).toBe('mockValue');

    htmlResponse.flush(mockSecondResponse);

    tick();
    fixture.detectChanges();

    expect(staticHtml.nativeElement.innerHTML).toBe(mockSecondResponse.form);
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

    tick();
    fixture.detectChanges();

    const formElem = fixture.debugElement.query(By.css('form'));

    const inputElem = fixture.nativeElement.querySelector('#name');

    inputElem.value = 'mockValue';

    formElem.triggerEventHandler('submit', event);

    tick();
    fixture.detectChanges();

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

    tick();
    fixture.detectChanges();

    nzSpinElem = fixture.debugElement.query(
      By.css('.spy-ajax-form-container + nz-spin'),
    );

    expect(nzSpinElem).toBeFalsy();
    expect(staticHtml.nativeElement.innerHTML).toBe(mockSecondResponse.form);
  }));
});
