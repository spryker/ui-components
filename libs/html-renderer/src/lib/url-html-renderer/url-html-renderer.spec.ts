import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { UrlHtmlRendererModule } from './url-html-renderer.module';

const mockHtmlTemplate = `<p>Hello World!!!</p>`;
const mockUrl = '/html-request';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UrlHtmlRendererModule, HttpClientTestingModule],
      declarations: [TestComponent],
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
      By.css('spy-html-renderer .spy-html-renderer-content'),
    );
    component.urlHtml = mockUrl;
    fixture.detectChanges();
    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');

    htmlResponse.flush(mockHtmlTemplate);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
  });

  it('should render html response inside `spy-html-renderer` when @Input(urlHtml) was changes', () => {
    const mockRerenderHtml = `<p>Rerendered!!!</p>`;
    const mockRerenderUrl = '/new-html-request';
    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer .spy-html-renderer-content'),
    );

    component.urlHtml = mockUrl;
    fixture.detectChanges();
    let htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockHtmlTemplate);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);

    component.urlHtml = mockRerenderUrl;
    fixture.detectChanges();
    htmlResponse = httpTestingController.expectOne(mockRerenderUrl);

    htmlResponse.flush(mockRerenderHtml);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml);
  });

  it('should emit @Output(urlHtmlLoading) on appropriate fetching process phases', () => {
    component.urlHtml = mockUrl;
    fixture.detectChanges();

    expect(component.urlHtmlLoading).toHaveBeenCalledWith(true);

    const htmlResponse = httpTestingController.expectOne(mockUrl);

    htmlResponse.flush(mockHtmlTemplate);
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
