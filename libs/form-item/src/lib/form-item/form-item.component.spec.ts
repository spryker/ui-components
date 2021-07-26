// tslint:disable: no-non-null-assertion
import { NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { OfTypePipeModule } from '@spryker/utils';

import { FormItemComponent } from './form-item.component';

describe('FormItemModule', () => {
  const { testModule, createComponent } = getTestingForComponent(
    FormItemComponent,
    {
      ngModule: {
        imports: [NoopAnimationsModule, OfTypePipeModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
      projectContent: `
        Label
        <span control>Control</span>
      `,
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('template must render as a tree [nz-form-item]=>[nz-form-label,nz-form-control]', async () => {
    const host = await createComponent({}, true);
    const formLabelElem = host.queryCss('nz-form-item nz-form-label');
    const formControlElem = host.queryCss('nz-form-item nz-form-control');

    expect(formLabelElem).toBeTruthy();
    expect(formControlElem).toBeTruthy();
  });

  it('should project content in <nz-form-label>', async () => {
    const host = await createComponent({}, true);
    const formLabelElem = host.queryCss('nz-form-label');

    expect(formLabelElem).toBeTruthy();
    expect(formLabelElem?.nativeElement.textContent.trim()).toBe('Label');
  });

  it('should project content `[control]` in <nz-form-label>', async () => {
    const host = await createComponent({}, true);
    const formControlElem = host.queryCss('nz-form-control');

    expect(formControlElem).toBeTruthy();
    expect(formControlElem?.nativeElement.textContent.trim()).toBe('Control');
  });

  it('input nzNoColon must be set to true on nz-form-label', async () => {
    const host = await createComponent({}, true);
    const labelComponent = host.queryCss('nz-form-label');

    expect(labelComponent).toBeTruthy();
    expect(labelComponent!.properties.nzNoColon).toBe(true);
  });

  describe('@Input(required)', () => {
    describe('when is truthy', () => {
      it('should render `*` after projected content in <nz-form-label>', async () => {
        const host = await createComponent({ required: true }, true);
        const labelComponent = host.queryCss('nz-form-label');

        expect(labelComponent).toBeTruthy();
        expect(labelComponent?.nativeElement.textContent.trim()).toBe(
          'Label *',
        );
      });
    });
  });

  it('should not render label on noLabel', async () => {
    const host = await createComponent({ noLabel: true }, true);

    const labelComponent = host.queryCss('nz-form-label');

    expect(labelComponent).toBeFalsy();
  });

  it('should add no-spaces class to nz-form-item', async () => {
    const host = await createComponent({ noSpaces: true }, true);

    const formItemComponent = host.queryCss('nz-form-item');

    expect(formItemComponent).toBeTruthy();
    expect(formItemComponent!.classes['no-spaces']).toBeTruthy();
  });

  it('should show error validation message', async () => {
    const host = await createComponent({ error: 'Error Message' }, true);

    const formControlElem = host.queryCss('nz-form-control');

    expect(formControlElem).toBeTruthy();
    expect(formControlElem!.properties.nzValidateStatus).toBe('error');
    expect(formControlElem!.properties.nzErrorTip).toEqual(
      expect.any(TemplateRef),
    );
  });

  it('should show warning validation message', async () => {
    const host = await createComponent({ warning: 'Warning Message' }, true);

    const formControlElem = host.queryCss('nz-form-control');

    expect(formControlElem).toBeTruthy();
    expect(formControlElem!.properties.nzValidateStatus).toBe('warning');
    expect(formControlElem!.properties.nzWarningTip).toBe('Warning Message');
  });

  it('should show hint validation message', async () => {
    const host = await createComponent({ hint: 'Hint Message' }, true);

    const formControlElem = host.queryCss('nz-form-control');

    expect(formControlElem).toBeTruthy();
    expect(formControlElem!.properties.nzValidateStatus).toEqual('validating');
    expect(formControlElem!.properties.nzValidatingTip).toBe('Hint Message');
  });
});
