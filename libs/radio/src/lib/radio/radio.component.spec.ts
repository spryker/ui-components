import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RadioModule } from '../radio.module';
import { RadioComponent } from './radio.component';

@Component({
    standalone: false,
    selector: 'spy-test',
    template: `
        <spy-radio-group>
            <spy-radio [value]="value" [disabled]="disabled" [hasError]="hasError" (selected)="selectedSpy($event)">
            </spy-radio>
        </spy-radio-group>
    `,
})
class TestGroupComponent {
    @Input() value: any;
    @Input() disabled: any;
    @Input() hasError: any;
    selectedSpy = jest.fn<string, any[]>();
}

describe('RadioComponent', () => {
    describe('Single Radio', () => {
        let fixture: any;
        const q = (css: string) => fixture.debugElement.query(By.css(css));

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [RadioComponent],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: true },
            }).compileComponents();

            fixture = TestBed.createComponent(RadioComponent);
            fixture.detectChanges();
        });

        it('should render `label[nz-radio]`', () => {
            const labelDe = q('label[nz-radio]');
            expect(labelDe).toBeTruthy();
        });

        it('should bound @Input(value) to the input `nzValue` of `label` element', () => {
            const mockValue = 'mockValue';
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();
            expect(q('label[nz-radio]').nativeNode.nzValue).toBe(mockValue);
        });

        it('should bound @Input(disabled) to the input `nzDisabled` of `label` element', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();
            expect(q('label[nz-radio]').nativeNode.nzDisabled).toBe(true);
        });

        it('should add `spy-radio--disabled` to the host if @Input(disabled) is `true`', () => {
            const hostEl: HTMLElement = fixture.nativeElement;
            expect(hostEl.classList.contains('spy-radio--disabled')).toBe(false);

            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(hostEl.classList.contains('spy-radio--disabled')).toBe(true);
        });

        it('should add `spy-radio--error` to the host if @Input(hasError) is `true`', () => {
            const hostEl: HTMLElement = fixture.nativeElement;
            expect(hostEl.classList.contains('spy-radio--error')).toBe(false);

            fixture.componentRef.setInput('hasError', true);
            fixture.detectChanges();

            expect(hostEl.classList.contains('spy-radio--error')).toBe(true);
        });

        it('should trigger `selected` callback when `ngModelChange` on `label` element was triggered', () => {
            const mockValue = 'mockValue';
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const emitSpy = jest.spyOn(fixture.componentInstance.selected, 'emit');
            const labelDe = q('label[nz-radio]');
            labelDe.triggerEventHandler('ngModelChange', {});
            fixture.detectChanges();

            expect(emitSpy).toHaveBeenCalledWith(mockValue);
        });
    });

    describe('Input element', () => {
        let fixture: any;
        const q = (css: string) => fixture.debugElement.query(By.css(css));

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [RadioComponent],
                imports: [NzRadioModule],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: true },
            }).compileComponents();

            fixture = TestBed.createComponent(RadioComponent);
            fixture.detectChanges();
        });

        it('should set @Input(value) to the input element', () => {
            const mockValue = 'mockValue';
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const inputEl: HTMLInputElement = q('label[nz-radio] input').nativeElement;
            expect(inputEl.value).toBe(mockValue);
        });
    });

    describe('Radio With Group Component', () => {
        let fixture: any;
        const q = (css: string) => fixture.debugElement.query(By.css(css));

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [TestGroupComponent],
                imports: [RadioModule],
                schemas: [NO_ERRORS_SCHEMA],
                teardown: { destroyAfterEach: true },
            }).compileComponents();

            fixture = TestBed.createComponent(TestGroupComponent);
            fixture.detectChanges();
        });

        it('should bound @Input(value) to the input `nzValue` of `label` element', () => {
            const mockValue = 'mockValue';
            fixture.componentRef.setInput('value', mockValue);
            fixture.detectChanges();

            const inputEl: HTMLInputElement = q('label[nz-radio] input').nativeElement;
            expect(inputEl.value).toBe(mockValue);
        });

        it('should bound @Input(disabled) to the input `nzDisabled` of `label` element', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            const inputEl: HTMLInputElement = q('label[nz-radio] input').nativeElement;
            expect(inputEl.disabled).toBe(true);
        });

        it('should add `spy-radio--disabled` to the `.spy-radio` if @Input(disabled) is `true`', () => {
            const hostEl: HTMLElement = q('.spy-radio').nativeElement;
            expect(hostEl.classList.contains('spy-radio--disabled')).toBe(false);

            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(hostEl.classList.contains('spy-radio--disabled')).toBe(true);
        });

        it('should add `spy-radio--error` to the `.spy-radio` if @Input(hasError) is `true`', () => {
            const hostEl: HTMLElement = q('.spy-radio').nativeElement;
            expect(hostEl.classList.contains('spy-radio--error')).toBe(false);

            fixture.componentRef.setInput('hasError', true);
            fixture.detectChanges();

            expect(hostEl.classList.contains('spy-radio--error')).toBe(true);
        });
    });
});
