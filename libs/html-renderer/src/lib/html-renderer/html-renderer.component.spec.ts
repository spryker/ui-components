import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SpinnerSize } from '@spryker/spinner';
import { createComponentWrapper } from '@spryker/internal-utils';
import { Observable, ReplaySubject } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { HtmlRendererComponent } from './html-renderer.component';
import { HtmlRendererProvider } from './html-renderer.provider';

const mockHtmlTemplate = `
  <p>Hello World!!!</p>
`;

class MockHtmlRendererProvider {
    html$ = new ReplaySubject<string>(1);
    isLoading$ = new ReplaySubject<void>(1);

    getHtml(): Observable<string> {
        return this.html$;
    }

    isLoading(): Observable<void> {
        return this.isLoading$;
    }
}

describe('HtmlRendererComponent', () => {
    let testHtmlRendererProvider: MockHtmlRendererProvider;

    const { testModule, createComponent } = getTestingForComponent(HtmlRendererComponent, {
        ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                {
                    provide: HtmlRendererProvider,
                    useExisting: MockHtmlRendererProvider,
                },
                MockHtmlRendererProvider,
            ],
            teardown: { destroyAfterEach: false },
        });

        testHtmlRendererProvider = TestBed.inject(MockHtmlRendererProvider);
    });

    it('should render <spy-html-renderer> component', async () => {
        const host = await createComponentWrapper(createComponent);
        const htmlRendererElem = host.queryCss('spy-html-renderer');

        expect(htmlRendererElem).toBeTruthy();
    });

    it('should render html inside <spy-html-renderer>', async () => {
        const host = await createComponentWrapper(createComponent);
        const htmlRendererElem = host.queryCss('spy-html-renderer .spy-html-renderer__content');

        testHtmlRendererProvider.html$.next(mockHtmlTemplate);
        host.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
    });

    it('should render <spy-spinner> if `isLoading$` signal invokes', async () => {
        const host = await createComponentWrapper(createComponent);

        testHtmlRendererProvider.isLoading$.next();
        host.detectChanges();

        const spinElem = host.queryCss('spy-spinner');

        expect(spinElem).toBeTruthy();
    });

    it('should not render <spy-spinner> if `isLoading$` signal does not invoke', async () => {
        const host = await createComponentWrapper(createComponent);
        const spinElem = host.queryCss('spy-spinner');

        expect(spinElem).toBeFalsy();
    });

    it('should not render <spy-spinner> if `html$` signal invokes', async () => {
        const host = await createComponentWrapper(createComponent);

        testHtmlRendererProvider.isLoading$.next();
        host.detectChanges();

        let spinElem = host.queryCss('spy-spinner');

        expect(spinElem).toBeTruthy();

        testHtmlRendererProvider.html$.next(mockHtmlTemplate);
        host.detectChanges();
        spinElem = host.queryCss('spy-spinner');

        expect(spinElem).toBeFalsy();
    });

    it('should apply `size` attribute for <spy-spinner> element', async () => {
        const host = await createComponentWrapper(createComponent, { spinnerSize: SpinnerSize.Default });

        testHtmlRendererProvider.isLoading$.next();
        host.detectChanges();

        const spinElem = host.queryCss('spy-spinner');

        expect(spinElem.properties.size).toBe(SpinnerSize.Default);
    });

    it('should render html inside <spy-html-renderer> when html was changes', async () => {
        const mockRerenderHtml = `<p>Rerendered!!!</p>`;
        const host = await createComponentWrapper(createComponent);
        const htmlRendererElem = host.queryCss('spy-html-renderer .spy-html-renderer__content');

        testHtmlRendererProvider.html$.next(mockHtmlTemplate);
        host.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);

        testHtmlRendererProvider.html$.next(mockRerenderHtml);
        host.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml);
    });

    it('should emit @Output(htmlRendered) when component renders HTML code', fakeAsync(async () => {
        const host = await createComponentWrapper(createComponent);

        host.hostComponent.htmlRendered = jest.fn();
        testHtmlRendererProvider.html$.next(mockHtmlTemplate);

        host.detectChanges();
        tick();

        expect(host.hostComponent.htmlRendered).toHaveBeenCalled();
    }));
});
