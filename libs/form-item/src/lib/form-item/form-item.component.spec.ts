import { NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { FormItemComponent } from './form-item.component';

describe('FormItemModule', () => {
    const { testModule, createComponent } = getTestingForComponent(FormItemComponent, {
        ngModule: {
            imports: [NoopAnimationsModule, OfTypePipeModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: `
            Label
            <span control>Control</span>
        `,
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('template must render as a tree [nz-form-item]=>[nz-form-label,nz-form-control]', async () => {
        const host = await createComponentWrapper(createComponent);
        const formLabelElem = host.queryCss('nz-form-item nz-form-label');
        const formControlElem = host.queryCss('nz-form-item nz-form-control');

        expect(formLabelElem).toBeTruthy();
        expect(formControlElem).toBeTruthy();
    });

    it('should project content in <nz-form-label>', async () => {
        const host = await createComponentWrapper(createComponent);
        const formLabelElem = host.queryCss('nz-form-label');

        expect(formLabelElem).toBeTruthy();
        expect(formLabelElem.nativeElement.textContent.trim()).toBe('Label');
    });

    it('should project content `[control]` in <nz-form-label>', async () => {
        const host = await createComponentWrapper(createComponent);
        const formControlElem = host.queryCss('nz-form-control');

        expect(formControlElem).toBeTruthy();
        expect(formControlElem.nativeElement.textContent.trim()).toBe('Control');
    });

    it('input `nzNoColon` must be set to true on <nz-form-label>', async () => {
        const host = await createComponentWrapper(createComponent);
        const labelComponent = host.queryCss('nz-form-label');

        expect(labelComponent).toBeTruthy();
        expect(labelComponent.properties.nzNoColon).toBe(true);
    });

    describe('@Input(required)', () => {
        describe('when is truthy', () => {
            it('should render `*` after projected content in <nz-form-label>', async () => {
                const host = await createComponentWrapper(createComponent, { required: true });
                const labelComponent = host.queryCss('nz-form-label');

                expect(labelComponent).toBeTruthy();
                expect(labelComponent.nativeElement.textContent.trim()).toBe('Label *');
            });
        });
    });

    it('should not render label on noLabel', async () => {
        const host = await createComponentWrapper(createComponent, { noLabel: true });
        const labelComponent = host.queryCss('nz-form-label');

        expect(labelComponent).toBeFalsy();
    });

    it('should add `no-spaces` class to <nz-form-item>', async () => {
        const host = await createComponentWrapper(createComponent, { noSpaces: true });
        const formItemComponent = host.queryCss('nz-form-item');

        expect(formItemComponent).toBeTruthy();
        expect(formItemComponent.classes['no-spaces']).toBeTruthy();
    });

    it('should show error validation message', async () => {
        const host = await createComponentWrapper(createComponent, { error: 'Error Message' });
        const formControlElem = host.queryCss('nz-form-control');

        expect(formControlElem).toBeTruthy();
        expect(formControlElem.properties.nzValidateStatus).toBe('error');
        expect(formControlElem.properties.nzErrorTip).toEqual(expect.any(TemplateRef));
    });

    it('should show warning validation message', async () => {
        const mockWarning = 'Warning Message';
        const host = await createComponentWrapper(createComponent, { warning: mockWarning });
        const formControlElem = host.queryCss('nz-form-control');

        expect(formControlElem).toBeTruthy();
        expect(formControlElem.properties.nzValidateStatus).toBe('warning');
        expect(formControlElem.properties.nzWarningTip).toBe(mockWarning);
    });

    it('should show hint validation message', async () => {
        const mockHint = 'Hint Message';
        const host = await createComponentWrapper(createComponent, { hint: mockHint });
        const formControlElem = host.queryCss('nz-form-control');

        expect(formControlElem).toBeTruthy();
        expect(formControlElem.properties.nzValidateStatus).toEqual('validating');
        expect(formControlElem.properties.nzValidatingTip).toBe(mockHint);
    });
});
