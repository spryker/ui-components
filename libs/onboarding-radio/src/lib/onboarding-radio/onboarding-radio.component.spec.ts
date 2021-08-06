import { TestBed } from '@angular/core/testing';

import { OnboardingRadioComponent } from './onboarding-radio.component';
import { NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { TestLocaleModule } from '@spryker/locale/testing';
import { RomanPipe } from '@spryker/utils';
import { IconOnboardingCheckModule } from '@spryker/icon/icons';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'spyRoman',
})
class MockRomanPipe {
  transform = jest.fn();
}

describe('OnboardingRadioComponent', () => {
  let romanPipe: MockRomanPipe;

  const { testModule, createComponent } = getTestingForComponent(
    OnboardingRadioComponent,
    {
      ngModule: {
        imports: [TestLocaleModule],
        declarations: [OnboardingRadioItemComponent, RomanPipe],
        exports: [OnboardingRadioItemComponent],
        schemas: [NO_ERRORS_SCHEMA],
      },
      projectContent: `
        <spy-onboarding-radio-item value="A">Radio 1...</spy-onboarding-radio-item>
        <spy-onboarding-radio-item value="B" disabled>Radio 2...</spy-onboarding-radio-item>
        <spy-onboarding-radio-item value="C">Radio 3...</spy-onboarding-radio-item>
        `,
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      declarations: [],
      providers: [],
    });
    // romanPipe = TestBed.inject(MockRomanPipe);
  });

  it('should create', async () => {
    const host = await createComponent({ value: 'A' }, true);
    expect(host.fixture.componentInstance).toBeTruthy();
  });

  describe('template', () => {
    it('should render spy icon component', async () => {
      const host = await createComponent({ value: 'A' }, true);
      const icon = host.queryCss('spy-icon');
      expect(icon).toBeTruthy();
      expect(icon?.properties.name).toBe(IconOnboardingCheckModule.icon);
    });

    it('should be render nz-radio-group', async () => {
      const host = await createComponent({ value: 'A' }, true);
      const radioGroup = host.queryCss('nz-radio-group');
      expect(radioGroup?.properties.ngModel).toBe('A');
    });

    it('should change value after ngModelChange', async () => {
      const host = await createComponent({ value: 'A' }, true);

      const newValue = 'C';

      const radioGroup = host.queryCss('nz-radio-group');

      radioGroup?.triggerEventHandler('ngModelChange', newValue);
      host.detectChanges();

      expect(radioGroup?.properties.ngModel).toBe(newValue);
    });

    it('should render 3 labels', async () => {
      const host = await createComponent({ value: 'A' }, true);
      const labels = host.fixture.debugElement.queryAll(By.css('label'));
      expect(labels.length).toBe(3);
    });

    it('should be render label properties', async () => {
      const host = await createComponent({ value: 'A' }, true);
      const label = host.queryCss('label');
      expect(label?.attributes['nz-radio']).toBeDefined();
      expect(label?.properties.nzValue).toBe('A');
      expect(label?.properties.nzDisabled).toBe(false);
    });
  });
});
