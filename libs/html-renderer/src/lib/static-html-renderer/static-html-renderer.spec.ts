import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StaticHtmlRendererModule } from './static-html-renderer.module';

const mockHtmlTemplate = `<p>Hello World!!!</p>`;

@Component({
    standalone: false,
    template: `<spy-html-renderer [html]="html"></spy-html-renderer>`,
})
class TestHostComponent {
    @Input() html: any;
}

describe('StaticHtmlRendererDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    const q = (sel: string) => fixture.debugElement.query(By.css(sel));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [StaticHtmlRendererModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
    });

    it('renders @Input(html) inside <spy-html-renderer>', () => {
        fixture.componentInstance.html = mockHtmlTemplate;
        fixture.detectChanges();

        const content = q('spy-html-renderer .spy-html-renderer__content');
        expect(content).toBeTruthy();
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(mockHtmlTemplate);
    });

    it('re-renders when @Input(html) changes', () => {
        const rerender = `<p>Rerendered!!!</p>`;

        fixture.componentInstance.html = mockHtmlTemplate;
        fixture.detectChanges();
        const content = q('spy-html-renderer .spy-html-renderer__content');
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(mockHtmlTemplate);

        fixture.componentInstance.html = rerender;
        fixture.detectChanges();
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(rerender);
    });
});
