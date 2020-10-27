import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AjaxActionService } from '@spryker/ajax-action';

import { UrlHtmlRendererModule } from './url-html-renderer.module';

const mockHtmlTemplate = `<p>Hello World!!!</p>`;
const mockUrl = '/html-request';

class MockAjaxActionService {
  handle = jest.fn();
}

@Component({
  selector: 'spy-test',
  template: `
    <spy-html-renderer
      [urlHtml]="urlHtml"
      (urlHtmlLoading)="urlHtmlLoading($event)"
    ></spy-html-renderer>
  `,
})
class TestComponent {
  urlHtml: any;
  urlHtmlLoading = jest.fn();
}

describe('UrlHtmlRendererDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let httpTestingController: HttpTestingController;
  let ajaxActionService: MockAjaxActionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UrlHtmlRendererModule, HttpClientTestingModule],
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        MockAjaxActionService,
        {
          provide: AjaxActionService,
          useExisting: MockAjaxActionService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    ajaxActionService = TestBed.inject(MockAjaxActionService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should render html response inside of `spy-html-renderer`', () => {
    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );
    component.urlHtml = mockUrl;
    fixture.detectChanges();
    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');

    htmlResponse.flush({
      html: mockHtmlTemplate,
    });
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
  });

  it('should render html response inside `spy-html-renderer` when @Input(urlHtml) was changes', () => {
    const mockRerenderHtml = `<p>Rerendered!!!</p>`;
    const mockRerenderUrl = '/new-html-request';
    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );

    component.urlHtml = mockUrl;
    fixture.detectChanges();
    let htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush({
      html: mockHtmlTemplate,
    });
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);

    component.urlHtml = mockRerenderUrl;
    fixture.detectChanges();
    htmlResponse = httpTestingController.expectOne(mockRerenderUrl);

    htmlResponse.flush({
      html: mockRerenderHtml,
    });
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml);
  });

  it('should emit @Output(urlHtmlLoading) on appropriate fetching process phases', () => {
    component.urlHtml = mockUrl;
    fixture.detectChanges();

    expect(component.urlHtmlLoading).toHaveBeenCalledWith(true);

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush({
      html: mockHtmlTemplate,
    });
    fixture.detectChanges();

    expect(component.urlHtmlLoading).toHaveBeenCalledWith(false);
  });

  it('should emit @Output(urlHtmlLoading) on unsuccessful response', () => {
    component.urlHtml = mockUrl;
    fixture.detectChanges();

    expect(component.urlHtmlLoading).toHaveBeenCalledWith(true);

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.error(new ErrorEvent('Error'));
    fixture.detectChanges();

    expect(component.urlHtmlLoading).toHaveBeenCalledWith(false);
  });

  it('should call `AjaxActionService` with response object', () => {
    const mockResponse = {
      html: mockHtmlTemplate,
      postActions: [
        {
          type: 'mock',
          addProperty: 'addProperty',
        },
      ],
    };

    component.urlHtml = mockUrl;
    fixture.detectChanges();
    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');

    htmlResponse.flush(mockResponse);
    fixture.detectChanges();

    expect(ajaxActionService.handle).toHaveBeenCalledWith(mockResponse);
  });
});
