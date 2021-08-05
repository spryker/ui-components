import { TestBed } from '@angular/core/testing';

import { OnboardingRadioComponent } from './onboarding-radio.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { OnboardingRadioModule } from '../onboarding-radio.module';

interface RadioItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}
describe('OnboardingRadioComponent', () => {
  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'test',
    template: `
      <spy-onboarding-radio [(value)]="value">
        <spy-onboarding-radio-item
          *ngFor="let radioItem of radioItems"
          [value]="radioItem.value"
          [disabled]="radioItem.disabled"
        >
          {{ radioItem.label }}
        </spy-onboarding-radio-item>
      </spy-onboarding-radio>
    `,
  })
  class TestComponent {
    value = 'A';
    radioItems: RadioItem[] = [
      {
        label: 'Radio 1...',
        value: 'A',
      },
      {
        label: 'Radio 2...',
        value: 'B',
        disabled: true,
      },
      {
        label: 'Radio 3...',
        value: 'C',
      },
    ];
  }

  const { testModule, createComponent } = getTestingForComponent(
    TestComponent,
    {
      ngModule: {
        imports: [OnboardingRadioModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  describe('template', () => {
    it('should create', async () => {
      const host = await createComponent({}, true);
      expect(host.fixture.componentInstance).toBeTruthy();
    });

    it('should render spy icon components', async () => {
      const host = await createComponent({}, true);
      const icon = host.queryCss('spy-icon');
      expect(icon).toBeTruthy();
    });

    it('should render III as count of radios', async () => {
      const host = await createComponent({}, true);
      const title = host.queryCss('.spy-onboarding-radio-items-count');
      expect(title?.nativeElement.textContent).toBe('III');
    });

    it('should render 3 inputs with radio', async () => {
      const host = await createComponent({}, true);
      const radios = host.htmlElement.querySelectorAll('label[nz-radio]');
      expect(radios?.length).toBe(3);
    });

    it('should render 2nd radio to be disabled', async () => {
      const host = await createComponent({}, true);
      const disabledRadio = host.queryCss(
        'label[nz-radio]:nth-child(2) input:disabled',
      );
      expect(disabledRadio).toBeTruthy();
    });
  });

  describe('events', () => {
    it('should change value and selected radio when click on 3rd radio', async () => {
      const host = await createComponent({}, true);

      const firstRadio = host.queryCss('label[nz-radio]:nth-child(1)');
      const thirdRadio = host.queryCss('label[nz-radio]:nth-child(3)');

      thirdRadio?.nativeElement.click();
      host.detectChanges();

      expect(host.hostComponent.instance?.value).toBe('C');

      expect(firstRadio?.classes['ant-radio-wrapper-checked']).toBe(false);
      expect(thirdRadio?.classes['ant-radio-wrapper-checked']).toBe(true);
    });

    it('should NOT change value when clicked on disabled radio', async () => {
      const host = await createComponent({}, true);

      const firstRadio = host.queryCss('label[nz-radio]:nth-child(1)');
      const secondRadio = host.queryCss('label[nz-radio]:nth-child(2)');

      secondRadio?.nativeElement.click();
      host.detectChanges();

      expect(host.hostComponent.instance?.value).toBe('A');

      expect(firstRadio?.classes['ant-radio-wrapper-checked']).toBe(true);
      expect(secondRadio?.classes['ant-radio-wrapper-checked']).toBe(false);
    });
  });
});
