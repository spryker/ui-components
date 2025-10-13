import { NO_ERRORS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpinnerSize } from '@spryker/spinner';
import { ReplaySubject, Observable } from 'rxjs';
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

@Component({
    standalone: false,
    template: ` <spy-html-renderer [spinnerSize]="spinnerSize" (htmlRendered)="onRendered()"></spy-html-renderer> `,
})
class TestHostComponent {
    spinnerSize: SpinnerSize | undefined;
    @Output() htmlRendered = new EventEmitter<void>();
    onRendered = jest.fn();
}

describe('HtmlRendererComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let provider: MockHtmlRendererProvider;

    const q = (sel: string) => fixture.debugElement.query(By.css(sel));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HtmlRendererComponent, TestHostComponent],
            providers: [{ provide: HtmlRendererProvider, useClass: MockHtmlRendererProvider }],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        provider = TestBed.inject(HtmlRendererProvider) as unknown as MockHtmlRendererProvider;
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('renders <spy-html-renderer>', () => {
        expect(q('spy-html-renderer')).toBeTruthy();
    });

    it('renders html content inside .spy-html-renderer__content', () => {
        provider.html$.next(mockHtmlTemplate);
        fixture.detectChanges();

        const content = q('spy-html-renderer .spy-html-renderer__content');
        expect(content).toBeTruthy();
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(mockHtmlTemplate);
    });

    it('shows <spy-spinner> when isLoading$ emits', () => {
        provider.isLoading$.next();
        fixture.detectChanges();

        expect(q('spy-spinner')).toBeTruthy();
    });

    it('does not show <spy-spinner> when isLoading$ has not emitted', () => {
        expect(q('spy-spinner')).toBeFalsy();
    });

    it('hides <spy-spinner> after html$ emits', () => {
        provider.isLoading$.next();
        fixture.detectChanges();
        expect(q('spy-spinner')).toBeTruthy();

        provider.html$.next(mockHtmlTemplate);
        fixture.detectChanges();
        expect(q('spy-spinner')).toBeFalsy();
    });

    it('applies [size] to <spy-spinner>', () => {
        fixture.componentInstance.spinnerSize = SpinnerSize.Default;
        fixture.detectChanges();

        provider.isLoading$.next();
        fixture.detectChanges();

        const spinner = q('spy-spinner');
        expect(spinner).toBeTruthy();
        expect(spinner.properties.size).toBe(SpinnerSize.Default);
    });

    it('re-renders html when html$ emits again', () => {
        const rerender = `<p>Rerendered!!!</p>`;

        provider.html$.next(mockHtmlTemplate);
        fixture.detectChanges();
        const content = q('spy-html-renderer .spy-html-renderer__content');
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(mockHtmlTemplate);

        provider.html$.next(rerender);
        fixture.detectChanges();
        expect((content.nativeElement as HTMLElement).innerHTML).toBe(rerender);
    });

    it('emits (htmlRendered) when HTML is rendered', fakeAsync(() => {
        const host = fixture.componentInstance;
        host.onRendered = jest.fn();

        provider.html$.next(mockHtmlTemplate);
        fixture.detectChanges();
        tick();

        expect(host.onRendered).toHaveBeenCalled();
    }));
});
