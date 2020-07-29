import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { Observable, ReplaySubject } from 'rxjs';

import { HtmlRendererComponent } from './html-renderer.component';
import { HtmlRendererProvider } from './html-renderer.provider';

// tslint:disable: no-non-null-assertion

const mockHtmlTemplate = `
  <p>Hello World!!!</p>
`;

class MockHtmlRendererProvider {
  html$ = new ReplaySubject<string>(1);

  getHtml(): Observable<string> {
    return this.html$.asObservable();
  }
}

describe('HtmlRendererComponent', () => {
  let testHtmlRendererProvider: MockHtmlRendererProvider;

  const { testModule, createComponent } = getTestingForComponent(
    HtmlRendererComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
    },
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        {
          provide: HtmlRendererProvider,
          useExisting: MockHtmlRendererProvider,
        },
        MockHtmlRendererProvider,
      ],
    });
    testHtmlRendererProvider = TestBed.inject(MockHtmlRendererProvider);
  }));

  it('should render `spy-html-renderer` component', async () => {
    const host = await createComponent({}, true);
    const htmlRendererElem = host.queryCss('spy-html-renderer')!;

    expect(htmlRendererElem).toBeTruthy();
  });

  it('should render html inside `spy-html-renderer`', async () => {
    const host = await createComponent({}, true);
    const htmlRendererElem = host.queryCss(
      'spy-html-renderer .spy-html-renderer__content',
    )!;

    testHtmlRendererProvider.html$.next(mockHtmlTemplate);
    host.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
  });

  it('should render `nz-spin` if html does not exist', async () => {
    const host = await createComponent({}, true);
    const spinElem = host.queryCss('nz-spin')!;

    expect(spinElem).toBeTruthy();
  });

  it('should render html inside `spy-html-renderer` when html was changes', async () => {
    const mockRerenderHtml = `<p>Rerendered!!!</p>`;
    const host = await createComponent({}, true);
    const htmlRendererElem = host.queryCss(
      'spy-html-renderer .spy-html-renderer__content',
    )!;

    testHtmlRendererProvider.html$.next(mockHtmlTemplate);
    host.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);

    testHtmlRendererProvider.html$.next(mockRerenderHtml);
    host.detectChanges();

    expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml);
  });

  it('should emit @Output(htmlRendered) when component renders HTML code', async () => {
    const host = await createComponent({}, true);

    host.hostComponent.htmlRendered = jest.fn();
    testHtmlRendererProvider.html$.next(mockHtmlTemplate);
    host.detectChanges();

    expect(host.hostComponent.htmlRendered).toHaveBeenCalled();
  });
});
