import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { By } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let triggerButton: DebugElement;
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzLayoutModule],
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
    const iconComponent = triggerButton.query(By.css('spy-icon'));

    expect(iconComponent).toBeTruthy();
    expect(iconComponent.attributes.name).toEqual('dropdown-arrow');
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
