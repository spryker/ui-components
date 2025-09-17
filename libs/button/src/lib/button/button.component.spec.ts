import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { buttonClassName } from '../button-core/button-core';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonComponent, ButtonType } from './button.component';

@Component({
    standalone: false,
    template: `
    <spy-button
      [variant]="variant"
      [shape]="shape"
      [size]="size"
      [attrs]="attrs"
      [type]="type"
      [disabled]="disabled"
    >
      <span class="icon-element" icon></span>
      Content
    </spy-button>
  `,
})
class TestHostComponent {
    variant?: ButtonVariant;
    shape?: ButtonShape;
    size?: ButtonSize;
    attrs?: Record<string, unknown>;
    type?: ButtonType | string;
    disabled?: boolean;
}

describe('ButtonComponent', () => {
    const buttonCls = 'spy-button';
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostEl: HTMLElement;
    let buttonCmp: ButtonComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        hostFixture = TestBed.createComponent(TestHostComponent);
        hostFixture.detectChanges();

        hostEl = hostFixture.nativeElement.querySelector('spy-button') as HTMLElement;
        const buttonDe = hostFixture.debugElement.query(By.directive(ButtonComponent));
        buttonCmp = buttonDe.componentInstance as ButtonComponent;
    });

    it('should render <button>', () => {
        const buttonElem = hostFixture.debugElement.query(By.css('button'));
        expect(buttonElem).toBeTruthy();
    });

    it('should render projected content inside <button>', () => {
        const buttonElem = hostFixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
        expect(buttonElem.textContent).toMatch('Content');
    });

    it('should add static classes to host element', () => {
        expect(hostEl.classList.contains(buttonClassName)).toBe(true);
        expect(hostEl.classList.contains(buttonCls)).toBe(true);
    });

    it('should add static classes to <button> element', () => {
        const btn = hostFixture.debugElement.query(By.css('button'));
        expect(btn.nativeElement.classList.contains(`${buttonClassName}__btn`)).toBe(true);
        expect(btn.nativeElement.classList.contains(`${buttonCls}__btn`)).toBe(true);
    });

    it('should render icon in the `.spy-button-core__btn-icon` element', () => {
        const iconEl = hostFixture.debugElement.query(By.css('.spy-button-core__btn-icon .icon-element'));
        expect(iconEl).toBeTruthy();
    });

    it('should add appropriate @Input(variant), @Input(shape), @Input(size) classes to the host', () => {
        hostFixture.componentInstance.variant = ButtonVariant.Critical;
        hostFixture.componentInstance.shape = ButtonShape.Circle;
        hostFixture.componentInstance.size = ButtonSize.Large;
        hostFixture.detectChanges();

        expect(hostEl.classList.contains(`${buttonClassName}--${ButtonVariant.Critical}`)).toBe(true);
        expect(hostEl.classList.contains(`${buttonCls}--${ButtonVariant.Critical}`)).toBe(true);
        expect(hostEl.classList.contains(`${buttonClassName}--${ButtonShape.Circle}`)).toBe(true);
        expect(hostEl.classList.contains(`${buttonCls}--${ButtonShape.Circle}`)).toBe(true);
        expect(hostEl.classList.contains(`${buttonClassName}--${ButtonSize.Large}`)).toBe(true);
        expect(hostEl.classList.contains(`${buttonCls}--${ButtonSize.Large}`)).toBe(true);
    });

    it('should bind `attrs` to `spyApplyAttrs` properties of <button>', () => {
        const mockedAttrs = { mockAttr: 'mockAttr' };
        hostFixture.componentInstance.attrs = mockedAttrs;
        hostFixture.detectChanges();

        const btnDe = hostFixture.debugElement.query(By.css('button'));
        expect(btnDe.properties.spyApplyAttrs).toBe(mockedAttrs);
    });

    describe('@Input(type)', () => {
        it('should by default have value `button`', () => {
            expect(buttonCmp.type).toBe('button');
        });

        it('should bind to `type` of <button>', () => {
            hostFixture.componentInstance.type = 'value';
            hostFixture.detectChanges();

            const btnDe = hostFixture.debugElement.query(By.css('button'));
            expect(btnDe.properties.type).toBe('value');
        });
    });

    describe('@Input(disabled)', () => {
        it('should by default have value `false`', () => {
            expect(buttonCmp.disabled).toBe(false);
        });

        it('should bind to `disabled` of <button>', () => {
            hostFixture.componentInstance.disabled = true;
            hostFixture.detectChanges();

            const btnDe = hostFixture.debugElement.query(By.css('button'));
            expect(btnDe.properties.disabled).toBe(true);
        });
    });

    it('should add default @Input(variant), @Input(shape), @Input(size) properties when undefined passed', () => {
        hostFixture.componentInstance.variant = undefined;
        hostFixture.componentInstance.shape = undefined;
        hostFixture.componentInstance.size = undefined;
        hostFixture.componentInstance.type = undefined;
        hostFixture.detectChanges();

        expect(buttonCmp.size).toBe(ButtonSize.Medium);
        expect(buttonCmp.shape).toBe(ButtonShape.Default);
        expect(buttonCmp.variant).toBe(ButtonVariant.Primary);
        expect(buttonCmp.type).toBe(ButtonType.Button);
    });
});
