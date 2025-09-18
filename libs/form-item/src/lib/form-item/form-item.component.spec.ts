import { NO_ERRORS_SCHEMA, TemplateRef, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { NzFormModule, NzFormLabelComponent, NzFormControlComponent } from 'ng-zorro-antd/form';
import { FormItemComponent } from './form-item.component';

@Component({
    standalone: false,
    selector: 'spy-host',
    template: `
        <spy-form-item
            [required]="required"
            [noLabel]="noLabel"
            [noSpaces]="noSpaces"
            [error]="error"
            [warning]="warning"
            [hint]="hint"
        >
            Label
            <span control>Control</span>
        </spy-form-item>
    `,
})
class TestHostComponent {
    @Input() required?: boolean;
    @Input() noLabel?: boolean;
    @Input() noSpaces?: boolean;
    @Input() error?: string;
    @Input() warning?: string;
    @Input() hint?: string;
}

describe('FormItemComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    const q = (sel: string) => fixture.debugElement.query(By.css(sel));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormItemComponent, TestHostComponent],
            imports: [NoopAnimationsModule, OfTypePipeModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('renders as [nz-form-item]=>[nz-form-label,nz-form-control]', () => {
        const formLabelElem = q('nz-form-item nz-form-label');
        const formControlElem = q('nz-form-item nz-form-control');
        expect(formLabelElem).toBeTruthy();
        expect(formControlElem).toBeTruthy();
    });

    it('projects label content into <nz-form-label>', () => {
        const formLabelElem = q('nz-form-label');
        expect(formLabelElem).toBeTruthy();
        expect(formLabelElem.nativeElement.textContent.trim()).toContain('Label');
    });

    it('projects [control] content into <nz-form-control>', () => {
        const formControlElem = q('nz-form-control');
        expect(formControlElem).toBeTruthy();
        expect(formControlElem.nativeElement.textContent.trim()).toContain('Control');
    });

    it('sets nzNoColon=true on <nz-form-label>', () => {
        const labelDe = q('nz-form-label');
        expect(labelDe).toBeTruthy();
        expect(labelDe.nativeNode.nzNoColon).toBe(true);
    });

    describe('@Input(required)', () => {
        it('renders "*" after label when truthy', () => {
            fixture.componentRef.setInput('required', true);
            fixture.detectChanges();
            const labelComponent = q('nz-form-label');
            expect(labelComponent).toBeTruthy();
            expect(labelComponent.nativeElement.textContent.trim()).toBe('Label *');
        });
    });

    it('hides label when noLabel=true', () => {
        fixture.componentRef.setInput('noLabel', true);
        fixture.detectChanges();
        const labelComponent = q('nz-form-label');
        expect(labelComponent).toBeFalsy();
    });

    it('adds "no-spaces" class to <nz-form-item> when noSpaces=true', () => {
        fixture.componentRef.setInput('noSpaces', true);
        fixture.detectChanges();
        const formItem = q('nz-form-item');
        expect(formItem).toBeTruthy();
        expect(formItem.classes['no-spaces']).toBe(true);
    });

    it('shows error validation message', () => {
        fixture.componentRef.setInput('error', 'Error Message');
        fixture.detectChanges();

        const controlDe = q('nz-form-control');
        expect(controlDe).toBeTruthy();

        expect(controlDe.nativeNode.nzValidateStatus).toBe('error');
        expect(controlDe.nativeNode.nzErrorTip).toBeInstanceOf(TemplateRef);
    });

    it('shows warning validation message', () => {
        const msg = 'Warning Message';
        fixture.componentRef.setInput('warning', msg);
        fixture.detectChanges();

        const controlDe = q('nz-form-control');
        expect(controlDe).toBeTruthy();

        expect(controlDe.nativeNode.nzValidateStatus).toBe('warning');
        expect(controlDe.nativeNode.nzWarningTip).toBe(msg);
    });

    it('shows hint validation message', () => {
        const msg = 'Hint Message';
        fixture.componentRef.setInput('hint', msg);
        fixture.detectChanges();

        const controlDe = q('nz-form-control');
        expect(controlDe).toBeTruthy();

        expect(controlDe.nativeNode.nzValidateStatus).toBe('validating');
        expect(controlDe.nativeNode.nzValidatingTip).toBe(msg);
    });
});
