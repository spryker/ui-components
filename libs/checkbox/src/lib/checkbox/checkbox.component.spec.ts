import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApplyAttrsModule } from '@spryker/utils';
import { CheckboxComponent } from './checkbox.component';

@Component({
    standalone: false,
    template: `
        <spy-checkbox
            [spyId]="spyId"
            [name]="name"
            [required]="required"
            [indeterminate]="indeterminate"
            [disabled]="disabled"
            [attrs]="attrs"
            [checked]="checked"
            (checkedChange)="checkedChange($event)"
            >Label</spy-checkbox
        >
    `,
})
class TestHostComponent {
    @Input() spyId?: string;
    @Input() name?: string;
    @Input() required?: boolean;
    @Input() indeterminate?: boolean;
    @Input() disabled?: boolean;
    @Input() attrs?: Record<string, unknown> | string;
    @Input() checked?: boolean;

    checkedChange = jest.fn();
}

describe('CheckboxComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    const checkboxSelector = 'label[nz-checkbox]';
    const hiddenInputSelector = `${checkboxSelector} + input`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CheckboxComponent, TestHostComponent],
            imports: [ApplyAttrsModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

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
            expect((labelElem.nativeElement as HTMLElement).textContent).toMatch('Label');
        });
    });

    describe('@Input(spyId)', () => {
        it('must be bound to id property of hidden HTML <input>', () => {
            fixture.componentInstance.spyId = 'testId';
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.attributes['id']).toBe('testId');
        });
    });

    describe('@Input(name)', () => {
        it('must be bound to name attribute of hidden HTML <input>', () => {
            fixture.componentInstance.name = 'testName';
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.attributes['name']).toBe('testName');
        });
    });

    describe('@Input(required)', () => {
        it('must be bound to required property of hidden HTML <input>', () => {
            fixture.componentInstance.required = true;
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.properties['required']).toBe(true);
        });
    });

    describe('@Input(indeterminate)', () => {
        it('must be bound to `nzIndeterminate` input of `nz-checkbox`', () => {
            fixture.componentInstance.indeterminate = true;
            fixture.detectChanges();

            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            expect(labelElem.properties['nzIndeterminate']).toBe(true);
        });
    });

    describe('@Input(disabled)', () => {
        it('must be bound to disabled property of hidden HTML <input>', () => {
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.properties['disabled']).toBe(true);
        });

        it('must be bound to `nzDisabled` input of `nz-checkbox`', () => {
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();

            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            expect(labelElem.properties['nzDisabled']).toBe(true);
        });
    });

    describe('@Input(attrs)', () => {
        it('must be bound to the appropriate attributes of hidden HTML <input>', () => {
            fixture.componentInstance.attrs = { test: 'attr1', test2: 'attr2' };
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('must parses to JSON format if it string', () => {
            fixture.componentInstance.attrs = '{"test":"attr1","test2":"attr2"}';
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.attributes['test']).toBe('attr1');
            expect(inputElem.attributes['test2']).toBe('attr2');
        });

        it('must updates when changed', () => {
            fixture.componentInstance.attrs = { test: 'attr1', test2: 'attr2' };
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));

            fixture.componentInstance.attrs = { test: 'attr6' };
            fixture.detectChanges();
            expect(inputElem.attributes['test']).toBe('attr6');
            expect(inputElem.attributes['test2']).toBe(undefined);

            fixture.componentInstance.attrs = { test: null as unknown as string };
            fixture.detectChanges();
            expect(inputElem.attributes['test']).toBe('null');

            fixture.componentInstance.attrs = { test: '' };
            fixture.detectChanges();
            expect(inputElem.attributes['test']).toBe('');
        });
    });

    describe('@Input(checked)', () => {
        it('must be bound to ngModel property of hidden HTML <input> with negative `indeterminate` input', () => {
            fixture.componentInstance.checked = true;
            fixture.componentInstance.indeterminate = false;
            fixture.detectChanges();

            const inputElem = fixture.debugElement.query(By.css(hiddenInputSelector));
            expect(inputElem.properties['ngModel']).toBe(true);
        });

        it('must be bound to `ngModel` input of `nz-checkbox`', () => {
            fixture.componentInstance.checked = true;
            fixture.detectChanges();

            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            expect(labelElem.properties['ngModel']).toBe(true);
        });
    });

    describe('@Output(checkedChange)', () => {
        it('must be emitted every time `ngModelChange` emits from `nz-checkbox`', () => {
            const labelElem = fixture.debugElement.query(By.css(checkboxSelector));
            labelElem.triggerEventHandler('ngModelChange', null);
            fixture.detectChanges();

            expect(fixture.componentInstance.checkedChange).toHaveBeenCalled();
        });
    });
});
