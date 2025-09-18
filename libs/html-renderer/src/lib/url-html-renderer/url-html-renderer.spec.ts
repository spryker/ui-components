import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AjaxActionService } from '@spryker/ajax-action';
import { UrlHtmlRendererModule } from './url-html-renderer.module';

const mockUrl = '/html-request';
const mockResponse = { html: `<p>Hello World!!!</p>` };

class MockAjaxActionService {
    handle = jest.fn();
}

@Component({
    standalone: false,
    template: `<spy-html-renderer [urlHtml]="urlHtml" (urlHtmlLoading)="urlHtmlLoading($event)"></spy-html-renderer>`,
})
class TestHostComponent {
    @Input() urlHtml: any;
    urlHtmlLoading = jest.fn<boolean, any[]>();
}

describe('UrlHtmlRendererDirective', () => {
    let httpMock: HttpTestingController;
    let fixture: any;
    let ajax: MockAjaxActionService;

    const q = (sel: string) => fixture.debugElement.query(By.css(sel));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [UrlHtmlRendererModule, HttpClientTestingModule],
            providers: [{ provide: AjaxActionService, useClass: MockAjaxActionService }],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);
        ajax = TestBed.inject(AjaxActionService) as unknown as MockAjaxActionService;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('renders html response inside <spy-html-renderer>', () => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.urlHtml = mockUrl;
        fixture.detectChanges();

        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toBe('GET');

        req.flush(mockResponse);
        fixture.detectChanges();

        const content = q('spy-html-renderer .spy-html-renderer__content');
        expect(content).toBeTruthy();
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(mockResponse.html);
    });

    it('re-renders when @Input(urlHtml) changes', () => {
        const newUrl = '/new-html-request';
        const newResponse = { html: `<p>Rerendered!!!</p>` };

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.urlHtml = mockUrl;
        fixture.detectChanges();

        let req = httpMock.expectOne(mockUrl);
        req.flush(mockResponse);
        fixture.detectChanges();

        let content = q('spy-html-renderer .spy-html-renderer__content');
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(mockResponse.html);

        fixture.componentInstance.urlHtml = newUrl;
        fixture.detectChanges();

        req = httpMock.expectOne(newUrl);
        req.flush(newResponse);
        fixture.detectChanges();

        content = q('spy-html-renderer .spy-html-renderer__content');
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(newResponse.html);
    });

    it('calls AjaxActionService.handle with the response object and injector', () => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.urlHtml = mockUrl;
        fixture.detectChanges();

        const hostEl = q('spy-html-renderer');
        const req = httpMock.expectOne(mockUrl);
        expect(req.request.method).toBe('GET');

        req.flush(mockResponse);
        fixture.detectChanges();

        expect(ajax.handle).toHaveBeenCalledWith(mockResponse, hostEl.injector);
    });

    it('emits urlHtmlLoading true->false on success', () => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.urlHtml = mockUrl;
        fixture.detectChanges();

        expect(fixture.componentInstance.urlHtmlLoading).toHaveBeenCalledWith(true);

        const req = httpMock.expectOne(mockUrl);
        req.flush(mockResponse);
        fixture.detectChanges();

        expect(fixture.componentInstance.urlHtmlLoading).toHaveBeenCalledWith(false);
    });

    it('emits urlHtmlLoading true->false on error', () => {
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.componentInstance.urlHtml = mockUrl;
        fixture.detectChanges();

        expect(fixture.componentInstance.urlHtmlLoading).toHaveBeenCalledWith(true);

        const req = httpMock.expectOne(mockUrl);
        req.error(new ErrorEvent('Error'));
        fixture.detectChanges();

        expect(fixture.componentInstance.urlHtmlLoading).toHaveBeenCalledWith(false);
    });
});
