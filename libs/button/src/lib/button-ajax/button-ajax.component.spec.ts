import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAjaxComponent } from './button-ajax.component';
import { ButtonComponent } from "../button/button.component";

xdescribe('ButtonAjaxComponent', () => {
  let component: ButtonAjaxComponent;
  let fixture: ComponentFixture<ButtonAjaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonAjaxComponent, ButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAjaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
