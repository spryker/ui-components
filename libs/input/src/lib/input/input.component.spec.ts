import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ApplyAttrsModule } from '@spryker/utils';
import { NzInputModule } from 'ng-zorro-antd/input';
import { InputComponent } from './input.component';

@Component({
    standalone: false,
    template: `
        <spy-input
            [placeholder]="placeholder"
            [value]="value"
            [name]="name"
            [type]="type"
            [disabled]="disabled"
            [readOnly]="readOnly"
            [attrs]="attrs"
            [suffix]="suffix"
            [prefix]="prefix"
            [outerPrefix]="outerPrefix"
            [outerSuffix]="outerSuffix"
            (valueChange)="valueChange()"
        ></spy-input>
    `,
})
class HostComponent {
    @Input() placeholder?: string;
    @Input() value?: string;
    @Input() name?: string;
    @Input() type?: string;
    @Input() disabled?: boolean;
    @Input() readOnly?: boolean;
    @Input() attrs?: Record<string, string> | null;
    @Input() suffix?: string;
    @Input() prefix?: string;
    @Input() outerPrefix?: string;
    @Input() outerSuffix?: string;

    valueChange = jest.fn();
}

describe('InputComponent)', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent, HostComponent],
            imports: [FormsModule, ApplyAttrsModule, NzInputModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();
    });

    it('template must render input with [nz-input] inside nz-input-group', () => {
        const fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();

        const inputGroupElem = fixture.debugElement.query(By.css('nz-input-group'));
        expect(inputGroupElem).toBeTruthy();

        const inputElem = fixture.debugElement.query(By.css('input[nz-input]'));
        expect(inputElem).toBeTruthy();
    });

    describe('Inputs must be bound to internal input', () => {
        it('should bind placeholder to placeholder of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.placeholder = 'test placeholder';
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.getAttribute('placeholder')).toBe('test placeholder');
        });

        it('should bind value to ngModel of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.value = 'test value';
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.value).toBe('test value');
        });

        it('should bind name to name attribute of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.name = 'test name';
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.getAttribute('name')).toBe('test name');
        });

        it('should bind type to type of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.type = 'text';
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.type).toBe('text');
        });

        it('should bind disabled to disabled of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.disabled).toBe(true);
        });

        it('should bind readOnly to readOnly of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.readOnly = true;
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.readOnly).toBe(true);
        });
    });

    describe('Input attrs', () => {
        it('should parse and bind `attrs` to the appropriate attributes of input', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.attrs = { test: 'attr1', test2: 'attr2' };
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.getAttribute('test')).toBe('attr1');
            expect(inputEl.getAttribute('test2')).toBe('attr2');
        });

        it('should `attrs` updates appropriate attributes when changed', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.attrs = { test: 'attr1', test2: 'attr2' };
            fixture.detectChanges();
            await fixture.whenStable();

            const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
            expect(inputEl.getAttribute('test')).toBe('attr1');
            expect(inputEl.getAttribute('test2')).toBe('attr2');

            fixture.componentInstance.attrs = { test: 'attr6' };
            fixture.detectChanges();
            await fixture.whenStable();

            expect(inputEl.getAttribute('test')).toBe('attr6');
            expect(inputEl.getAttribute('test2')).toBe(null);

            fixture.componentInstance.attrs = null;
            fixture.detectChanges();
            await fixture.whenStable();

            expect(inputEl.getAttribute('test')).toBe(null);
        });
    });

    describe('Input prefix and suffix must be bound to nz-input-group', () => {
        it('should bind suffix to nzSuffix of nz-input-group', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.suffix = 'suffix';
            fixture.detectChanges();
            await fixture.whenStable();

            const suffixEl = fixture.debugElement.query(By.css('.ant-input-suffix'));
            expect(suffixEl).toBeTruthy();
            expect((suffixEl.nativeElement as HTMLElement).textContent?.trim()).toBe('suffix');
        });

        it('should bind prefix to nzPrefix of nz-input-group', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.prefix = 'prefix';
            fixture.detectChanges();
            await fixture.whenStable();

            const prefixEl = fixture.debugElement.query(By.css('.ant-input-prefix'));
            expect(prefixEl).toBeTruthy();
            expect((prefixEl.nativeElement as HTMLElement).textContent?.trim()).toBe('prefix');
        });
    });

    describe('Input outerPrefix and outerSuffix must be bound to nz-input-group', () => {
        it('should bind outerPrefix to nzAddOnBefore of nz-input-group', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.outerPrefix = 'outerPrefix';
            fixture.detectChanges();
            await fixture.whenStable();

            const addons = fixture.debugElement.queryAll(By.css('.ant-input-group .ant-input-group-addon'));
            expect(addons.length).toBeGreaterThan(0);
            const first = addons[0].nativeElement as HTMLElement;
            expect(first.textContent?.trim()).toBe('outerPrefix');
        });

        it('should bind outerSuffix to nzAddOnAfter of nz-input-group', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.componentInstance.outerSuffix = 'outerSuffix';
            fixture.detectChanges();
            await fixture.whenStable();

            const addons = fixture.debugElement.queryAll(By.css('.ant-input-group .ant-input-group-addon'));
            expect(addons.length).toBeGreaterThan(0);
            const last = addons[addons.length - 1].nativeElement as HTMLElement;
            expect(last.textContent?.trim()).toBe('outerSuffix');
        });
    });

    describe('valueChange', () => {
        it('should trigger change callback when ngModelChange was triggered', async () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            await fixture.whenStable();

            const inputDe = fixture.debugElement.query(By.css('input'));
            inputDe.triggerEventHandler('ngModelChange', {});
            fixture.detectChanges();

            expect(fixture.componentInstance.valueChange).toHaveBeenCalled();
        });
    });
});
