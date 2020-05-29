/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrawerWrapperComponent } from './drawer-wrapper.component';

describe('DrawerWrapperComponent', () => {
  let component: DrawerWrapperComponent;
  let fixture: ComponentFixture<DrawerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
