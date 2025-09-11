import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { StaticHtmlRendererModule } from './static-html-renderer.module';

const mockHtmlTemplate = `<p>Hello World!!!</p>`;

@Component({
    standalone: false,
    selector: 'spy-test',
    template: ` <spy-html-renderer [html]="html"></spy-html-renderer> `,
})
class TestComponent {
    @Input() html: any;
}

describe('StaticHtmlRendererDirective', () => {
    const { testModule, createComponent } = getTestingForComponent(TestComponent, {
        ngModule: {
            imports: [StaticHtmlRendererModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render @Input(html) inside of <spy-html-renderer>', async () => {
        const host = await createComponentWrapper(createComponent, { html: mockHtmlTemplate });
        const htmlRendererElem = host.queryCss('spy-html-renderer .spy-html-renderer__content');

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
    });

    it('should render html inside <spy-html-renderer> when @Input(html) was changes', async () => {
        const mockRerenderHtml = `<p>Rerendered!!!</p>`;
        const host = await createComponentWrapper(createComponent, { html: mockHtmlTemplate });
        const htmlRendererElem = host.queryCss('spy-html-renderer .spy-html-renderer__content');

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);

        host.setInputs({ html: mockRerenderHtml }, true);

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml);
    });
});
