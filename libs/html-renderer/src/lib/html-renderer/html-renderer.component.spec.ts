import { Component } from '@angular/core';
import {
  async,
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HtmlRendererModule } from '../html-renderer.module';

const mockHtmlTemplate = `
  <p>Hello World!!!</p>
`;

@Component({
  selector: 'spy-test',
  template: `
    <spy-html-renderer
      [html]="html"
      (htmlRendered)="renderedSpy()"
    ></spy-html-renderer>
  `,
})
class TestStaticHtmlComponent {
  html: any;
  renderedSpy = jest.fn();
}

@Component({
  selector: 'spy-test',
  template: `
    <spy-html-renderer
      [urlHtml]="urlHtml"
      (htmlRendered)="renderedSpy()"
    ></spy-html-renderer>
  `,
})
class TestUrlHtmlComponent {
  urlHtml: any;
  renderedSpy = jest.fn();
}

describe('HtmlRendererComponent', () => {
  describe('StaticHtmlRendererDirective', () => {
    let component: TestStaticHtmlComponent;
    let fixture: ComponentFixture<TestStaticHtmlComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HtmlRendererModule, BrowserModule],
        declarations: [TestStaticHtmlComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestStaticHtmlComponent);
      component = fixture.componentInstance;
    });

    it('should render `spy-html-renderer`', () => {
      const htmlRendererElem = fixture.debugElement.query(
        By.css('spy-html-renderer'),
      );

      expect(htmlRendererElem).toBeTruthy();
    });

    it('should render @Input(html) inside of `spy-html-renderer`', () => {
      component.html = mockHtmlTemplate;
      fixture.detectChanges();

      const htmlRendererElem = fixture.debugElement.query(
        By.css('spy-html-renderer'),
      );

      expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
    });

    it('should emit @Output(htmlRendered) when component renders HTML code', () => {
      component.html = mockHtmlTemplate;
      fixture.detectChanges();

      expect(component.renderedSpy).toHaveBeenCalled();
    });
  });

  describe('UrlHtmlRendererDirective', () => {
    let component: TestUrlHtmlComponent;
    let fixture: ComponentFixture<TestUrlHtmlComponent>;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HtmlRendererModule, BrowserModule, HttpClientTestingModule],
        declarations: [TestUrlHtmlComponent],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestUrlHtmlComponent);
      component = fixture.componentInstance;
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should render `spy-html-renderer`', () => {
      const htmlRendererElem = fixture.debugElement.query(
        By.css('spy-html-renderer'),
      );

      expect(htmlRendererElem).toBeTruthy();
    });

    it('should render html response inside of `spy-html-renderer`', () => {
      const mockUrl = '/html-request';
      component.urlHtml = mockUrl;
      fixture.detectChanges();
      const htmlResponse = httpTestingController.expectOne(mockUrl);

      expect(htmlResponse.request.method).toBe('GET');

      htmlResponse.flush(mockHtmlTemplate);
      fixture.detectChanges();
      const htmlRendererElem = fixture.debugElement.query(
        By.css('spy-html-renderer'),
      );

      expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
    });

    it('should emit @Output(htmlRendered) when component renders HTML code', () => {
      const mockUrl = '/html-request';
      component.urlHtml = mockUrl;
      fixture.detectChanges();
      const htmlResponse = httpTestingController.expectOne(mockUrl);

      expect(htmlResponse.request.method).toBe('GET');

      htmlResponse.flush(mockHtmlTemplate);
      fixture.detectChanges();

      expect(component.renderedSpy).toHaveBeenCalled();
    });
  });
});
