import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconModule } from '@spryker/icon';
import { By } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let triggerButton: DebugElement;
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzLayoutModule, HttpClientTestingModule, IconModule],
      providers: [],
      declarations: [SidebarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    triggerButton = fixture.debugElement.query(
      By.css('.ant-layout-sider-trigger'),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trigger button', () => {
    expect(triggerButton).toBeTruthy();
  });

  it('should render icon into the button', () => {
    const iconElement = triggerButton.query(By.css('spy-icon'));

    expect(iconElement).toBeTruthy();
  });

  it('should trigger sidebar', () => {
    spyOn(component.collapsedChange, 'emit');
    triggerButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.collapsedChange.emit).toHaveBeenCalledWith(true);
    expect(component.collapsed).toBeTruthy();

    triggerButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.collapsedChange.emit).toHaveBeenCalledWith(false);
    expect(component.collapsed).toBeFalsy();
  });
});
