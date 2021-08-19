import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRadioItemComponent } from './onboarding-radio-item.component';
import { Component } from '@angular/core';

describe('OnboardingRadioItemComponent', () => {
  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'test',
    template: `
      <spy-onboarding-radio-item [disabled]="disabled" [value]="value"
        >Label</spy-onboarding-radio-item
      >
    `,
  })
  class TestComponent {
    disabled: any;
    value: any;
    changeSpy = jest.fn();
  }
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingRadioItemComponent, TestComponent],
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
});
