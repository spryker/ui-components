import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { buttonClassName } from '../button-core/button-core';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonLinkComponent } from './button-link.component';

@Component({
    standalone: false,
    template: `
        <spy-button-link [url]="url" [variant]="variant" [shape]="shape" [size]="size" [attrs]="attrs">
            Content
        </spy-button-link>
    `,
})
class TestHostComponent {
    url?: string;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    size?: ButtonSize;
    attrs?: Record<string, unknown>;
}

describe('ButtonLinkComponent', () => {
    const buttonLinkCls = 'spy-button-link';
    let fixture: ComponentFixture<TestHostComponent>;
    let hostEl: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonLinkComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        hostEl = fixture.nativeElement.querySelector('spy-button-link') as HTMLElement;
    });

    it('should render <a>', () => {
        const linkDe = fixture.debugElement.query(By.css('a'));
        expect(linkDe).toBeTruthy();
    });

    it('should render projected content inside <a>', () => {
        const link = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
        expect(link.textContent).toMatch('Content');
    });

    it('should add static classes to host element', () => {
        expect(hostEl.classList.contains(buttonClassName)).toBe(true);
        expect(hostEl.classList.contains(buttonLinkCls)).toBe(true);
    });

    it('should add static classes to `a` element', () => {
        const linkDe = fixture.debugElement.query(By.css('a'));
        const el = linkDe.nativeElement as HTMLAnchorElement;
        expect(el.classList.contains(`${buttonClassName}__btn`)).toBe(true);
        expect(el.classList.contains(`${buttonLinkCls}__btn`)).toBe(true);
    });

    describe('@Inputs', () => {
        it('should bind input url to href of <a>', () => {
            const mockUrl = 'mockUrl';
            fixture.componentInstance.url = mockUrl;
            fixture.detectChanges();
            const linkEl = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
            expect(linkEl.getAttribute('href')).toBe(mockUrl);
        });

        it('should add appropriate @Input(variant), @Input(shape), @Input(size) classes to the host', () => {
            fixture.componentInstance.variant = ButtonVariant.Critical;
            fixture.componentInstance.shape = ButtonShape.Circle;
            fixture.componentInstance.size = ButtonSize.Large;
            fixture.detectChanges();
            expect(hostEl.classList.contains(`${buttonClassName}--${ButtonVariant.Critical}`)).toBe(true);
            expect(hostEl.classList.contains(`${buttonLinkCls}--${ButtonVariant.Critical}`)).toBe(true);
            expect(hostEl.classList.contains(`${buttonClassName}--${ButtonShape.Circle}`)).toBe(true);
            expect(hostEl.classList.contains(`${buttonLinkCls}--${ButtonShape.Circle}`)).toBe(true);
            expect(hostEl.classList.contains(`${buttonClassName}--${ButtonSize.Large}`)).toBe(true);
            expect(hostEl.classList.contains(`${buttonLinkCls}--${ButtonSize.Large}`)).toBe(true);
        });

        it('should bind attrs to spyApplyAttrs properties of <a>', () => {
            const mockedAttrs = { mockAttr: 'mockAttr' };
            fixture.componentInstance.attrs = mockedAttrs;
            fixture.detectChanges();
            const linkDe = fixture.debugElement.query(By.css('a'));
            expect(linkDe.properties.spyApplyAttrs).toBe(mockedAttrs);
        });
    });
});
