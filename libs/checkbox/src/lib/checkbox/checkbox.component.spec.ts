import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplyAttrsDirective } from '@spryker/utils';

import { CheckboxComponent } from './checkbox.component';
import { By } from '@angular/platform-browser';

describe('CheckboxComponent', () => {
    @Component({
        // eslint-disable-next-line @angular-eslint/component-selector
        selector: 'test',
        template: `
            <spy-checkbox
                [disabled]="disabled"
                [checked]="checked"
                [indeterminate]="indeterminate"
                [name]="name"
                [required]="required"
                [spyId]="spyId"
                [attrs]="attrs"
                (checkedChange)="changeSpy()"
                >Label</spy-checkbox
            >
        `,
    })
    class TestComponent {
        checked: any;
        disabled: any;
        indeterminate: any;
        name: any;
        required: any;
        spyId: any;
        attrs: any;
        changeSpy = jest.fn();
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CheckboxComponent, TestComponent, ApplyAttrsDirective],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    const checkboxSelector = 'label[nz-checkbox]';
    const hiddenInputSelector = `${checkboxSelector} + input`;

    describe('Template', () => {
        it('must render <label> with `nz-checkbox` from Ant Design', () => {
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            expect(labelElem).toBeTruthy();
        });

        it('must render hidden HTML <input>', () => {
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem).toBeTruthy();
        });

        it('must render default slot', () => {
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            expect(labelElem.nativeElement.textContent).toMatch('Label');
        });
    });

    describe('@Input(spyId)', () => {
        it('must be bound to id property of hidden HTML <input>', () => {
            const testId = 'testId';
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.spyId = testId;
            fixture.detectChanges();

            expect(inputElem.attributes.id).toBe(testId);
        });
    });

    describe('@Input(name)', () => {
        it('must be bound to name attribute of hidden HTML <input>', () => {
            const testName = 'testName';
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.name = testName;
            fixture.detectChanges();

            expect(inputElem.attributes.name).toBe(testName);
        });
    });

    describe('@Input(required)', () => {
        it('must be bound to required property of hidden HTML <input>', () => {
            const testRequired = true;
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.required = testRequired;
            fixture.detectChanges();

            expect(inputElem.properties.required).toBe(testRequired);
        });
    });

    describe('@Input(indeterminate)', () => {
        it('must be bound to `nzIndeterminate` input of `nz-checkbox`', () => {
            const testIndeterminate = true;
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            component.indeterminate = testIndeterminate;
            fixture.detectChanges();

            expect(labelElem.properties.nzIndeterminate).toBe(testIndeterminate);
        });
    });

    describe('@Input(disabled)', () => {
        it('must be bound to disabled property of hidden HTML <input>', () => {
            const testDisabled = true;
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.disabled = testDisabled;
            fixture.detectChanges();

            expect(inputElem.properties.disabled).toBe(testDisabled);
        });

        it('must be bound to `nzDisabled` input of `nz-checkbox`', () => {
            const testDisabled = true;
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            component.disabled = testDisabled;
            fixture.detectChanges();

            expect(labelElem.properties.nzDisabled).toBe(testDisabled);
        });
    });

    describe('@Input(attrs)', () => {
        it('must be bound to the appropriate attributes of hidden HTML <input>', () => {
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.attrs = {
                test: 'attr1',
                test2: 'attr2',
            };
            fixture.detectChanges();

            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('must parses to JSON format if it string', () => {
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.attrs = '{"test":"attr1","test2":"attr2"}';
            fixture.detectChanges();

            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('must updates when changed', () => {
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.attrs = {
                test: 'attr1',
                test2: 'attr2',
            };
            fixture.detectChanges();

            component.attrs = {
                test: 'attr6',
            };
            fixture.detectChanges();

            expect(inputElem.attributes['test']).toBe('attr6');
            expect(inputElem.attributes['test2']).toBe(null);

            component.attrs = null;
            fixture.detectChanges();

            expect(inputElem.attributes['test']).toBe(null);

            component.attrs = '';
            fixture.detectChanges();

            expect(inputElem.attributes['test']).toBe(null);
        });
    });

    describe('@Input(checked)', () => {
        it('must be bound to ngModel property of hidden HTML <input> with negative `indeterminate` input', () => {
            const testChecked = true;
            const testIndeterminate = false;
            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            component.checked = testChecked;
            component.indeterminate = testIndeterminate;
            fixture.detectChanges();

            expect(inputElem.properties.ngModel).toBe(testChecked && !testIndeterminate);
        });

        it('must be bound to `ngModel` input of `nz-checkbox`', () => {
            const testChecked = true;
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            component.checked = testChecked;
            fixture.detectChanges();

            expect(labelElem.properties.ngModel).toBe(testChecked);
        });
    });

    describe('@Output(checkedChange)', () => {
        it('must be emitted every time `ngModelChange` emits from `nz-checkbox`', () => {
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            labelElem.triggerEventHandler('ngModelChange', null);
            fixture.detectChanges();

            expect(component.changeSpy).toHaveBeenCalled();
        });
    });
});
