import { Component, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AjaxActionService } from '@spryker/ajax-action';
import { UrlHtmlRendererModule } from './url-html-renderer.module';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

const mockUrl = '/html-request';
const mockResponse = {
    html: `<p>Hello World!!!</p>`,
};

class MockAjaxActionService {
    handle = jest.fn();
}

@Component({
    selector: 'spy-test',
    template: ` <spy-html-renderer [urlHtml]="urlHtml" (urlHtmlLoading)="urlHtmlLoading($event)"></spy-html-renderer> `,
})
class TestComponent {
    @Input() urlHtml: any;
    urlHtmlLoading = jest.fn<boolean, any[]>();
}

describe('UrlHtmlRendererDirective', () => {
    let httpTestingController: HttpTestingController;
    let mockAjaxActionService: MockAjaxActionService;

    const { testModule, createComponent } = getTestingForComponent(TestComponent, {
        ngModule: {
            imports: [UrlHtmlRendererModule, HttpClientTestingModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                MockAjaxActionService,
                {
                    provide: AjaxActionService,
                    useExisting: MockAjaxActionService,
                },
            ],
            teardown: { destroyAfterEach: false },
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        mockAjaxActionService = TestBed.inject(MockAjaxActionService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should render html response inside of `spy-html-renderer`', async () => {
        const host = await createComponent({ urlHtml: mockUrl }, true);
        const htmlRendererElem = host.queryCss('spy-html-renderer .spy-html-renderer__content');
        const htmlResponse = httpTestingController.expectOne(mockUrl);

        expect(htmlResponse.request.method).toBe('GET');

        htmlResponse.flush(mockResponse);
        host.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockResponse.html);
    });

    it('should render html response inside `spy-html-renderer` when @Input(urlHtml) was changes', async () => {
        const host = await createComponent({ urlHtml: mockUrl }, true);
        const mockRerenderHtml = {
            html: `<p>Rerendered!!!</p>`,
        };
        const mockRerenderUrl = '/new-html-request';
        const htmlRendererElem = host.queryCss('spy-html-renderer .spy-html-renderer__content');
        let htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush(mockResponse);
        host.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockResponse.html);

        host.setInputs({ urlHtml: mockRerenderUrl }, true);
        htmlResponse = httpTestingController.expectOne(mockRerenderUrl);
        htmlResponse.flush(mockRerenderHtml);
        host.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml.html);
    });

    it('should call `handle` method from `AjaxActionService` with the response object', async () => {
        const host = await createComponent({ urlHtml: mockUrl }, true);
        const htmlRendererElem = host.queryCss('spy-html-renderer');
        const htmlResponse = httpTestingController.expectOne(mockUrl);

        expect(htmlResponse.request.method).toBe('GET');

        htmlResponse.flush(mockResponse);
        host.detectChanges();

        expect(mockAjaxActionService.handle).toHaveBeenCalledWith(mockResponse, htmlRendererElem.injector);
    });

    it('should emit @Output(urlHtmlLoading) on appropriate fetching process phases', async () => {
        const host = await createComponent({ urlHtml: mockUrl }, true);

        expect(host.component.urlHtmlLoading).toHaveBeenCalledWith(true);

        const htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.flush(mockResponse);
        host.detectChanges();

        expect(host.component.urlHtmlLoading).toHaveBeenCalledWith(false);
    });

    it('should emit @Output(urlHtmlLoading) on unsuccessful response', async () => {
        const host = await createComponent({ urlHtml: mockUrl }, true);

        expect(host.component.urlHtmlLoading).toHaveBeenCalledWith(true);

        const htmlResponse = httpTestingController.expectOne(mockUrl);

        htmlResponse.error(new ErrorEvent('Error'));
        host.detectChanges();

        expect(host.component.urlHtmlLoading).toHaveBeenCalledWith(false);
    });
});
