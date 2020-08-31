import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { I18nTestService, TestLocaleModule } from '@spryker/locale/testing';

import { OnboardingRadioItemComponent } from '../onboarding-radio-item/onboarding-radio-item.component';
import { OnboardingRadioComponent } from './onboarding-radio.component';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'spyNumberTransform',
})
export class MockNumberTransformPipe implements PipeTransform {
  transform(value: number, key?: string): number {
    return value;
  }
}

// tslint:disable: no-non-null-assertion
describe('OnboardingRadioComponent', () => {
  let service: I18nTestService;

  const projectedContent = `
    <spy-onboarding-radio-item value="A">
      Radio Content 1
    </spy-onboarding-radio-item>
    <spy-onboarding-radio-item value="B" disabled="true">
      Radio Content 2
    </spy-onboarding-radio-item>
    <spy-onboarding-radio-item value="C">
      Radio Content 3
    </spy-onboarding-radio-item>
  `;

  const { testModule, createComponent } = getTestingForComponent(
    OnboardingRadioComponent,
    {
      ngModule: {
        imports: [TestLocaleModule],
        declarations: [OnboardingRadioItemComponent, MockNumberTransformPipe],
        exports: [OnboardingRadioItemComponent],
        schemas: [NO_ERRORS_SCHEMA],
      },
      projectContent: projectedContent,
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
    service = TestBed.inject(I18nTestService);
  });

  it('should render <nz-radio-group>', async () => {
    const host = await createComponent({}, true);
    const radiosElement = host.queryCss('nz-radio-group')!;

    expect(radiosElement).toBeTruthy();
  });

  it('should render number of total radios', async () => {
    const host = await createComponent({}, true);
    const token = 'radio.title:number';
    const titleElement = host.queryCss('.spy-onboarding-radio__title-text')!;

    expect(titleElement.nativeElement.textContent).toContain(token);
    expect(service.getLocaleData(token, 'number')).toBe(3);
  });

  it('should render `label` with `nz-radio` attribute', async () => {
    const host = await createComponent({}, true);
    const labelElems = host.fixture.debugElement.queryAll(
      By.css('label[nz-radio]'),
    );

    expect(labelElems.length).toBe(3);
  });

  it('valueChange must be emitted every time ngModelChange emits from nz-radio-group', async () => {
    const host = await createComponent({}, true);
    const radiosElement = host.queryCss('nz-radio-group');

    expect(radiosElement).toBeTruthy();

    radiosElement!.triggerEventHandler('ngModelChange', 2);
    host.detectChanges();

    expect(host.hostComponent.valueChange).toHaveBeenCalledWith(2);
  });
});
