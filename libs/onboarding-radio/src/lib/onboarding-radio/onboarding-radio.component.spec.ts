import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { I18nTestService, TestLocaleModule } from '@spryker/locale/testing';
import { By } from '@angular/platform-browser';

import { OnboardingRadioComponent, OnboardingRadioItemComponent } from '@spryker/onboarding-radio';

@Pipe({
  name: 'numberToRomanStyle'
})
export class NumberToRomanStylePipe implements PipeTransform {
  transform(value: number, key?: string): number | string {
    return value;
  }
}

// tslint:disable: no-non-null-assertion
describe('OnboardingRadioComponent', () => {
  let mockService: I18nTestService;
  const projectedContent = `
    <spy-onboarding-radio-item value="A">Radio 1...</spy-onboarding-radio-item>
    <spy-onboarding-radio-item value="B" disabled>Radio 2...</spy-onboarding-radio-item>
    <spy-onboarding-radio-item value="C">Radio 3...</spy-onboarding-radio-item>
  `;

  const { testModule, createComponent } = getTestingForComponent(
    OnboardingRadioComponent,
    {
      ngModule: {
        imports: [TestLocaleModule],
        declarations: [OnboardingRadioItemComponent, NumberToRomanStylePipe],
        exports: [OnboardingRadioItemComponent],
        schemas: [NO_ERRORS_SCHEMA],
      },
      projectContent: projectedContent,
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
    mockService = TestBed.inject(I18nTestService);
  });

  it('should render <spy-icon>', async () => {
    const host = await createComponent({}, true);
    const iconElement = host.queryCss('spy-icon');

    expect(iconElement).toBeTruthy();
  });

  it('should render `.ant-radio__title-secondary`', async () => {
    const token = 'onboarding-radio.title:number';
    const host = await createComponent({}, true);
    const titleElement = host.queryCss('.ant-radio__title-secondary');
    const labelElement = host.fixture.debugElement.queryAll(By.css('label[nz-radio]'));

    expect(titleElement?.nativeElement.textContent).toContain(token);
    expect(mockService.getLocaleData(token, 'number')).toBe(labelElement.length);
  });

  it('should render <nz-radio-group>', async () => {
    const host = await createComponent({}, true);
    const iconElement = host.queryCss('nz-radio-group');

    expect(iconElement).toBeTruthy();
  });

  it('should bind value to ngModel of nz-radio-group', async () => {
    const mockValue = 'A';
    const host = await createComponent({
      value: mockValue
    }, true);
    const radiosElement = host.queryCss('nz-radio-group');

    expect(radiosElement?.properties.ngModel).toBe(mockValue);
  });

  it('checkedChange must be emitted every time ngModelChange emits from nz-radio-group', async () => {
    const host = await createComponent({}, true);
    const nzRadioGroupElem = host.queryCss('nz-radio-group');

    expect(nzRadioGroupElem).toBeTruthy();

    nzRadioGroupElem!.triggerEventHandler('ngModelChange', []);
    host.detectChanges();

    expect(host.hostComponent.checkedChange).toHaveBeenCalled();
  });
});
