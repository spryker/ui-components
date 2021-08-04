import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRadioComponent } from './onboarding-radio.component';

describe('OnboardingRadioComponent', () => {
  let component: OnboardingRadioComponent;
  let fixture: ComponentFixture<OnboardingRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
