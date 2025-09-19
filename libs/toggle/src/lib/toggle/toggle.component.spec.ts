import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleComponent } from './toggle.component';

@Component({
    standalone: false,
    selector: 'host-cmp',
    template: `<spy-toggle [name]="name" [value]="value" [disabled]="disabled" (valueChange)="onChange($event)"
        >Content</spy-toggle
    >`,
})
class HostComponent {
    @Input() name?: string;
    @Input() value?: boolean;
    @Input() disabled?: boolean;
    onChange = jest.fn();
}

describe('ToggleComponent', () => {
    let fixture: any;

    const nzSwitchSelector = 'nz-switch';
    const inputSelector = 'input[type=checkbox]';
    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, ToggleComponent],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
    });

    it('should render <nz-switch> element from Ant Design', async () => {
        expect(q(nzSwitchSelector)).toBeTruthy();
    });

    it('should render input type="checkbox" with style `display: none`', async () => {
        const inputElem = q(inputSelector);
        expect(inputElem).toBeTruthy();
        expect((inputElem.nativeElement as HTMLInputElement).style.display).toBe('none');
    });

    it('should render `ng-content` inside `.spy-toggle__label` wrapper element', async () => {
        const labelWrapperElem = q('.spy-toggle__label');
        expect(labelWrapperElem).toBeTruthy();
        expect(labelWrapperElem.nativeElement.textContent).toContain('Content');
    });

    describe('@Input(name)', () => {
        it('should bind to `name` attribute of input', async () => {
            fixture.componentRef.setInput('name', 'mock-name');
            fixture.detectChanges();

            const inputElem = q(inputSelector);
            expect(inputElem).toBeTruthy();
            expect(inputElem.attributes.name).toBe('mock-name');
        });
    });

    describe('@Input(value)', () => {
        it('should bind to `ngModel` property of nz-switch', async () => {
            fixture.componentRef.setInput('value', true);
            fixture.detectChanges();

            const nzSwitchElem = q(nzSwitchSelector);
            expect(nzSwitchElem).toBeTruthy();
            expect(nzSwitchElem.properties.ngModel).toBe(true);
        });

        it('should bind to `ngModel` property of input', async () => {
            fixture.componentRef.setInput('value', true);
            fixture.detectChanges();

            const inputElem = q(inputSelector);
            expect(inputElem).toBeTruthy();
            expect(inputElem.properties.ngModel).toBe(true);
        });
    });

    describe('@Input(disabled)', () => {
        it('should bind disabled to nzDisabled of nz-switch', async () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            const nzSwitchElem = q(nzSwitchSelector);
            expect(nzSwitchElem).toBeTruthy();
            expect(nzSwitchElem.properties.nzDisabled).toBe(true);
        });

        it('should bind `disabled` property of input', async () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            const inputElem = q(inputSelector);
            expect(inputElem).toBeTruthy();
            expect(inputElem.properties.disabled).toBe(true);
        });
    });

    describe('@Output(valueChange)', () => {
        it('should emit when `ngModelChange` emits from nz-switch', async () => {
            const nzSwitchElem = q(nzSwitchSelector);
            expect(nzSwitchElem).toBeTruthy();

            nzSwitchElem.triggerEventHandler('ngModelChange', 'value');
            fixture.detectChanges();

            expect(fixture.componentInstance.onChange).toHaveBeenCalledWith('value');
        });
    });
});
