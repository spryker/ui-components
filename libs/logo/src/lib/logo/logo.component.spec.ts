import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change image modifier', () => {
    const logoImageModifier = 'full';

    component.size = logoImageModifier;
    fixture.detectChanges();
    const logoElement = fixture.debugElement.query(
      By.css(`.spy-logo--${logoImageModifier}`),
    );
    expect(logoElement).toBeTruthy();
  });
});
