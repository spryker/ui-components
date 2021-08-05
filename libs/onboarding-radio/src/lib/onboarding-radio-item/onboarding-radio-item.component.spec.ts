import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRadioItemComponent } from './onboarding-radio-item.component';

describe('OnboardingRadioItemComponent', () => {
  let component: OnboardingRadioItemComponent;
  let fixture: ComponentFixture<OnboardingRadioItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingRadioItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingRadioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
