import { TestBed } from '@angular/core/testing';
import { OnboardingRadioComponent } from './onboarding-radio.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToRomanModule } from '@spryker/utils';
import { By } from '@angular/platform-browser';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

describe('OnboardingRadioComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    OnboardingRadioComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
        imports: [ToRomanModule],
        declarations: [OnboardingRadioItemComponent],
        exports: [OnboardingRadioItemComponent],
      },
      projectContent: `
        <spy-onboarding-radio-item value='A'
          >Radio 1...</spy-onboarding-radio-item
        >
        <spy-onboarding-radio-item value='B' disabled
          >Radio 2...</spy-onboarding-radio-item
        >
        <spy-onboarding-radio-item value='C'
          >Radio 3...</spy-onboarding-radio-item
        >
    `,
    },
  );
  const mockedDefaultValue = 'A';
  const mockedDisabledValue = 'B';
  const mockedCallValue = 'C';
  const mockedIconName = 'onboardingRadio';
  const mockedSpanTitle = 'III';

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  describe('Template', () => {
    it('must create <spy-icon> element', async () => {
      const host = await createComponent({}, true);
      host.detectChanges();
      const icon = host.hostElement.query(By.css('spy-icon'));
      expect(icon).toBeTruthy();
    });

    it('must bind property name into <spy-icon> element', async () => {
      const host = await createComponent({}, true);
      const icon = host.queryCss('spy-icon');
      expect(icon?.properties['name']).toBe(mockedIconName);
    });

    it('must create <span> element with class title', async () => {
      const host = await createComponent({}, true);
      const spanTitle = host.queryCss('span');
      expect(spanTitle?.nativeElement.innerHTML).toContain(mockedSpanTitle);
    });

    it('must create three <spy-onboarding-radio-item> elements', async () => {
      const host = await createComponent({}, true);
      const labels = host.hostElement.queryAll(By.css('label[nz-radio]'));
      expect(labels).toBeTruthy();
      expect(labels.length).toBe(3);
    });

    it('must <spy-onboarding-radio-item> with value:"B" and disabled', async () => {
      const host = await createComponent({}, true);
      const labels = host.hostElement.queryAll(By.css('label[nz-radio]'));
      expect(labels).toBeTruthy();
      expect(labels[1]?.properties['nzValue']).toBe(mockedDisabledValue);
      expect(labels[1]?.properties['nzDisabled']).not.toBe(mockedDisabledValue);
    });

    it('must have @input value', async () => {
      const host = await createComponent({ value: mockedDefaultValue }, true);
      const nzRadioGroup = host.queryCss('nz-radio-group');
      expect(nzRadioGroup?.properties['ngModel']).toBe(mockedDefaultValue);
      expect(host.component.value).toBe(mockedDefaultValue);
    });

    it('must change value', async () => {
      const host = await createComponent({ value: mockedDefaultValue }, true);
      const nzRadioGroup = host.queryCss('nz-radio-group');
      expect(host.component.value).toBe(mockedDefaultValue);
      nzRadioGroup?.triggerEventHandler('ngModelChange', mockedCallValue);
      expect(host.hostComponent.valueChange).toHaveBeenCalledWith(
        mockedCallValue,
      );
      expect(host.component.value).toBe(mockedCallValue);
    });
  });
});
