import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSize, ButtonType, ButtonAttributes } from '@spryker/button';
import { ButtonIconComponent } from './button-icon.component';
import { By } from '@angular/platform-browser';

describe('ButtonIconComponent', () => {
    let component: ButtonIconComponent;
    let fixture: ComponentFixture<ButtonIconComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonIconComponent],
            teardown: { destroyAfterEach: false },
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(ButtonIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render <button>', () => {
        const buttonElem = fixture.debugElement.query(By.css('button'));

        expect(buttonElem).toBeTruthy();
    });

    it('should render <spy-icon>', () => {
        const iconElem = fixture.debugElement.query(By.css('spy-icon'));

        expect(iconElem).toBeTruthy();
    });

    it('should add static class to host element', () => {
        expect(fixture.nativeElement.classList.contains('spy-button-icon')).toBeTruthy();
    });

    describe('@Inputs', () => {
        it(`should have type '${ButtonType.Button}' by default `, () => {
            expect(component.type).toBe(ButtonType.Button);
        });

        it('should bind type to `button` type', () => {
            const buttonElem = fixture.debugElement.query(By.css('button'));

            fixture.componentRef.setInput('type', ButtonType.Submit);
            fixture.detectChanges();

            expect(buttonElem.properties.type).toBe(ButtonType.Submit);
        });

        it('should bind size to `button` class', () => {
            const buttonElem = fixture.debugElement.query(By.css('button'));

            fixture.componentRef.setInput('size', ButtonSize.Small);
            fixture.detectChanges();

            expect(
                buttonElem.nativeElement.classList.contains(`spy-button-icon__button--${ButtonSize.Small}`),
            ).toBeTruthy();
        });

        it('should bind `iconName` to <spy-icon> element', () => {
            const iconElem = fixture.debugElement.query(By.css('spy-icon'));

            fixture.componentRef.setInput('iconName', 'test');
            fixture.detectChanges();

            expect(iconElem.properties.name).toBe('test');
        });

        it('should bind attrs to `button` spyApplyAttrs', () => {
            const mockAttrs: ButtonAttributes = {
                attr1: 'attr1Value',
                attr2: 'attr2Value',
            };
            const buttonElem = fixture.debugElement.query(By.css('button'));

            fixture.componentRef.setInput('attrs', mockAttrs);
            fixture.detectChanges();

            expect(buttonElem.properties.spyApplyAttrs).toBe(mockAttrs);
        });

        it('should have disabled `false` by default', () => {
            expect(component.disabled).toBe(false);
        });

        it('should add host class when disabled is `true`', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(fixture.nativeElement.classList.contains('spy-button-icon--disabled')).toBeTruthy();
        });

        it('should bind disabled to `button` disabled', () => {
            const buttonElem = fixture.debugElement.query(By.css('button'));

            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(buttonElem.properties.disabled).toBe(component.disabled);
        });
    });
});
