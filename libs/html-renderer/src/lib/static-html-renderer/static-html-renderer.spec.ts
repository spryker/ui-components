import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StaticHtmlRendererModule } from './static-html-renderer.module';

const mockHtmlTemplate = `<p>Hello World!!!</p>`;

@Component({
    selector: 'spy-test',
    template: ` <spy-html-renderer [html]="html"></spy-html-renderer> `,
})
class TestComponent {
    html: any;
}

describe('StaticHtmlRendererDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [StaticHtmlRendererModule],
            declarations: [TestComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should render @Input(html) inside of `spy-html-renderer`', () => {
        const htmlRendererElem = fixture.debugElement.query(By.css('spy-html-renderer .spy-html-renderer__content'));

        component.html = mockHtmlTemplate;
        fixture.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);
    });

    it('should render html inside `spy-html-renderer` when @Input(html) was changes', async () => {
        const mockRerenderHtml = `<p>Rerendered!!!</p>`;
        const htmlRendererElem = fixture.debugElement.query(By.css('spy-html-renderer .spy-html-renderer__content'));

        component.html = mockHtmlTemplate;
        fixture.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockHtmlTemplate);

        component.html = mockRerenderHtml;
        fixture.detectChanges();

        expect(htmlRendererElem.nativeElement.innerHTML).toBe(mockRerenderHtml);
    });
});
