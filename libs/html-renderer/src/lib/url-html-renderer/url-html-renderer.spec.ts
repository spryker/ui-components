import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AjaxActionService } from '@spryker/ajax-action';
import { UrlHtmlRendererModule } from './url-html-renderer.module';

const mockUrl = '/html-request';
const mockResponse = {
  html: `<p>Hello World!!!</p>`,
};

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

class MockAjaxActionService {
  handle = jest.fn();
}

describe('UrlHtmlRendererDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UrlHtmlRendererModule, HttpClientTestingModule],
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

  it('should render html response inside of `spy-html-renderer`', () => {
    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );

    component.urlHtml = mockUrl;
    fixture.detectChanges();

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');

    htmlResponse.flush(mockResponse);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockResponse.html);
  });

  it('should render html response inside `spy-html-renderer` when @Input(urlHtml) was changes', () => {
    const mockRerenderHtml = {
      html: `<p>Rerendered!!!</p>`,
    };
    const mockRerenderUrl = '/new-html-request';
    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer__content'),
    );

    component.urlHtml = mockUrl;
    fixture.detectChanges();

    let htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockResponse);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockResponse.html);

    component.urlHtml = mockRerenderUrl;
    fixture.detectChanges();
    htmlResponse = httpTestingController.expectOne(mockRerenderUrl);

    htmlResponse.flush(mockRerenderHtml);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(
      mockRerenderHtml.html,
    );
  });

  it('should emit @Output(urlHtmlLoading) on appropriate fetching process phases', () => {
    component.urlHtml = mockUrl;
    fixture.detectChanges();

    expect(component.urlHtmlLoading).toHaveBeenCalledWith(true);

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockResponse);
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
});
