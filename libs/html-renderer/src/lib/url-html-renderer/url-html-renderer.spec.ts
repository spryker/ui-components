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
    <spy-html-renderer [urlHtml]="urlHtml"></spy-html-renderer>
  `,
})
class TestComponent {
  urlHtml: any;
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
      By.css('spy-html-renderer'),
    );
    component.urlHtml = mockUrl;
    fixture.detectChanges();
    const htmlResponse = httpTestingController.expectOne(mockUrl);

    expect(htmlResponse.request.method).toBe('GET');

    htmlResponse.flush(mockHtmlTemplate);
    fixture.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
  });

  it('should render html response inside `spy-html-renderer` when @Input(urlHtml) was changes', async () => {
    const mockRerenderHtml = `<p>Rerendered!!!</p>`;
    const mockRerenderUrl = '/new-html-request';
    const htmlRendererElem = fixture.debugElement.query(
      By.css('spy-html-renderer'),
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
});
