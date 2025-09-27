import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputModule } from '@spryker/input';
import { IconOpenEyeModule, IconCrossedEyeModule } from '@spryker/icon/icons';
import { InputPasswordComponent } from './input-password.component';

describe('InputPasswordComponent', () => {
    describe('Host functionality', () => {
        let fixture: any;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [InputPasswordComponent],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: true },
            }).compileComponents();

            fixture = TestBed.createComponent(InputPasswordComponent);
            fixture.detectChanges();
        });

        it('should render <spy-input>', async () => {
            const inputElem = fixture.debugElement.query(By.css('spy-input'));
            expect(inputElem).toBeTruthy();
        });

        it('should add static class to host element', async () => {
            const inputPasswordClass = 'spy-input-password';
            const hostEl: HTMLElement = fixture.debugElement.nativeElement;
            expect(hostEl.classList.contains(inputPasswordClass)).toBe(true);
        });

        describe('@Inputs', () => {
            it('should bind `type` to `type` of <spy-input>', async () => {
                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.type).toBe('password');
            });

            it('should bind `name` to `name` of <spy-input>', async () => {
                fixture.componentRef.setInput('name', 'name');
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.name).toBe('name');
            });

            it('should bind `value` to `value` of <spy-input>', async () => {
                fixture.componentRef.setInput('value', 'value');
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.value).toBe('value');
            });

            it('should bind `spyId` to `spyId` of <spy-input>', async () => {
                fixture.componentRef.setInput('spyId', 'spyId');
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.spyId).toBe('spyId');
            });

            it('should bind `placeholder` to `placeholder` of <spy-input>', async () => {
                fixture.componentRef.setInput('placeholder', 'placeholder');
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.placeholder).toBe('placeholder');
            });

            it('should bind `outerPrefix` to `outerPrefix` of <spy-input>', async () => {
                fixture.componentRef.setInput('outerPrefix', 'outerPrefix');
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.outerPrefix).toBe('outerPrefix');
            });

            it('should bind `outerSuffix` to `outerSuffix` of <spy-input>', async () => {
                fixture.componentRef.setInput('outerSuffix', 'outerSuffix');
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.outerSuffix).toBe('outerSuffix');
            });

            it('should bind `readOnly` to `readOnly` of <spy-input>', async () => {
                fixture.componentRef.setInput('readOnly', true);
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.readOnly).toBe(true);
            });

            it('should bind `disabled` to `disabled` of <spy-input>', async () => {
                fixture.componentRef.setInput('disabled', true);
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.disabled).toBe(true);
            });

            it('should bind `required` to `required` of <spy-input>', async () => {
                fixture.componentRef.setInput('required', true);
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.required).toBe(true);
            });

            it('should bind `attrs` to `attrs` of <spy-input>', async () => {
                const mockAttrs = { attr1: 'attr1Value', attr2: 'attr2Value' };
                fixture.componentRef.setInput('attrs', mockAttrs);
                fixture.detectChanges();

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                expect(inputElem.properties.attrs).toBe(mockAttrs);
            });
        });

        describe('@Output(valueChange)', () => {
            it('should emit when `ngModelChange` emits from <spy-input>', async () => {
                const emitSpy = jest.spyOn(fixture.componentInstance.valueChange, 'emit');
                const mockValue = 'value';

                const inputElem = fixture.debugElement.query(By.css('spy-input'));
                inputElem.triggerEventHandler('valueChange', mockValue);
                fixture.detectChanges();

                expect(emitSpy).toHaveBeenCalledWith(mockValue);
            });
        });
    });

    describe('Icon element', () => {
        let fixture: any;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [InputPasswordComponent],
                imports: [InputModule],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: true },
            }).compileComponents();

            fixture = TestBed.createComponent(InputPasswordComponent);
            fixture.detectChanges();
        });

        it('should trigger host type and `spy-icon` name', async () => {
            const iconDe = fixture.debugElement.query(By.css('.spy-input-password__icon'));
            const inputDe = fixture.debugElement.query(By.css('input'));

            expect(iconDe.properties.name).toBe(IconOpenEyeModule.icon);
            expect((inputDe.nativeNode as HTMLInputElement).type).toBe('password');

            iconDe.triggerEventHandler('click', {});
            fixture.detectChanges();

            expect(iconDe.properties.name).toBe(IconCrossedEyeModule.icon);
            expect((inputDe.nativeNode as HTMLInputElement).type).toBe('text');
        });
    });
});
