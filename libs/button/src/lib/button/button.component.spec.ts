import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render button element with nz-button Ant directive', () => {
    const buttonElm = fixture.debugElement.query(By.css('button'));

    expect(buttonElm.nativeElement.hasAttribute('nz-button')).toBeTruthy();
  });

  it('is slot rendered inside internal button element', () => {
    const slotElm = fixture.debugElement.query(By.css('slot'));

    expect(slotElm.nativeElement).toBeTruthy();
  });

  it('is variant `primary` bound to nzType input of nz-button with value `primary` by default', () => {
    const buttonElm = fixture.debugElement.query(By.css('button'));

    expect(buttonElm.properties.nzType).toEqual('primary');
  });

  it('is size `md` bound to nzSize input of nz-button with value `default` by default', () => {
    const buttonElm = fixture.debugElement.query(By.css('button'));

    expect(buttonElm.properties.nzSize).toEqual('default');
  });
});
