/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrawerContainerComponent } from './drawer-container.component';

describe('DrawerContainerComponent', () => {
  let component: DrawerContainerComponent;
  let fixture: ComponentFixture<DrawerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
