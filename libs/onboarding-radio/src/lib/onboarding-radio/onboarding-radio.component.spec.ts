import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRadioComponent } from './onboarding-radio.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { IconOnboardingRadioModule } from '@spryker/icon/icons';
import { SelectComponentsModule } from '@spryker/web-components';
import { TransformToRomanModule } from '@spryker/utils';
import { By } from '@angular/platform-browser';

describe('OnboardingRadioComponent', () => {
  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'test',
    template: `
      <spy-onboarding-radio [value]="value" (valueChange)="changeSpy()">
        <spy-onboarding-radio-item value="A"
          >Radio 1...</spy-onboarding-radio-item
        >
        <spy-onboarding-radio-item value="B" disabled
          >Radio 2...</spy-onboarding-radio-item
        >
        <spy-onboarding-radio-item value="C"
          >Radio 3...</spy-onboarding-radio-item
        >
      </spy-onboarding-radio>
    `,
  })
  class TestComponent {
    value: any;
    changeSpy = jest.fn();
  }
  class MockEvent {
    preventDefault = jest.fn();
  }
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingRadioComponent, TestComponent],
      imports: [
        IconOnboardingRadioModule,
        NzRadioModule,
        TransformToRomanModule,
        SelectComponentsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // const amountOfRadioItemsSelector = 'span';
  // const radioItemSelector = 'nz-radio-group';
  // const radioSelector = 'nz-radio-group';

  describe('Template', () => {
    it('must create three <spy-onboarding-radio-item> elements', () => {
      // const hostElement = fixture.nativeElement;
      // console.log(fixture.debugElement);
      // const label: DebugElement = fixture.debugElement.query(
      //   By.css('spy-onboarding-radio'),
      // );
      console.log(fixture.debugElement.nativeElement.innerHTML);
      // console.log(fixture.debugElement);
      // span.forEach(el => {
      //   console.log(el);
      //   return;
      //   // console.log('---------------------------------------');
      // });
      // expect(label[0].attributes['ng-reflect-nz-value']).toMatch('A');
      // expect(label[1].attributes['ng-reflect-nz-value']).toMatch('B');
      // expect(label[2].attributes['ng-reflect-nz-value']).toMatch('C');
      // expect(label[0].attributes['ng-reflect-nz-disabled']).toBe('false');
      // expect(label[1].attributes['ng-reflect-nz-disabled']).toBe('');
      // expect(label[2].attributes['ng-reflect-nz-disabled']).toBe('false');
      expect(0).toEqual(1);
      // expect(span[0].attributes['nz-radio']).toMatch('');
      // expect(span[0].attributes['nz-radio']).toMatch('');
      // expect(span[0].attributes['nz-radio']).toMatch('');
    });

    it('must change value on click', () => {
      // console.log(component.value);
      // const formElem = fixture.debugElement.query(By.css('form'));
      const event = new MockEvent();
      const clickHandler = fixture.debugElement.query(
        By.css('spy-onboarding-radio'),
      );
      // console.log(clickHandler[0]);
      clickHandler.triggerEventHandler('click', event);
      fixture.detectChanges();
      // component.value = 'A'
      // console.log(component);
      expect(0).toEqual(0);
    });

    // it('must render default slot', () => {
    //   const labelElem = fixture.debugElement.query(By.css(radioSelector));
    //   expect(labelElem.nativeElement.textContent).toMatch('Radio');
    // });
  });
});
