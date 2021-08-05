import { TestBed } from '@angular/core/testing';

import { OnboardingRadioComponent } from './onboarding-radio.component';
import { NO_ERRORS_SCHEMA, Pipe } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { TestLocaleModule } from '@spryker/locale/testing';
import { RomanModule, RomanPipe } from '@spryker/utils';

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
    it('should render spy icon components', async () => {
      const host = await createComponent({ value: 'A' }, true);
      const icon = host.queryCss('spy-icon');
      expect(icon).toBeTruthy();
    });
    //
    // it('should render III as count of radios', async () => {
    //   const host = await createComponent({}, true);
    //   const title = host.queryCss('.spy-onboarding-radio-items-count');
    //   expect(title?.nativeElement.textContent).toBe('III');
    // });
    //
    // it('should render 3 inputs with radio', async () => {
    //   const host = await createComponent({}, true);
    //   const radios = host.htmlElement.querySelectorAll('label[nz-radio]');
    //   expect(radios?.length).toBe(3);
    // });
    //
    // it('should render 2nd radio to be disabled', async () => {
    //   const host = await createComponent({}, true);
    //   const disabledRadio = host.queryCss(
    //     'label[nz-radio]:nth-child(2) input:disabled',
    //   );
    //   expect(disabledRadio).toBeTruthy();
    // });
  });

  // describe('events', () => {
  //   it('should change value and selected radio when click on 3rd radio', async () => {
  //     const host = await createComponent({
  //       value: 'C'
  //     }, true);
  //
  //     const newValue = 'C';
  //
  //     const radioGroup = host.queryCss('nz-radio-group');
  //
  //     radioGroup?.triggerEventHandler('ngModelChange', newValue);
  //     host.detectChanges();
  //
  //     // expect(romanPipe.transform).toHaveBeenCalledWith(3);
  //     expect(radioGroup?.properties.ngModel).toBe(newValue);
  //
  //   });
  //
  //   it('should NOT change value when clicked on disabled radio', async () => {
  //     const host = await createComponent({
  //       value: 'C'
  //     }, true);
  //
  //     const firstRadio = host.queryCss('label[nz-radio]:nth-child(1)');
  //     const secondRadio = host.queryCss('label[nz-radio]:nth-child(2)');
  //
  //     secondRadio?.triggerEventHandler('click', {
  //       stopPropagation: function () {},
  //       preventDefault: function () {},
  //     });
  //     host.detectChanges();
  //
  //     expect(host.hostComponent.instance?.value).toBe('A');
  //
  //   });
  // });
});
