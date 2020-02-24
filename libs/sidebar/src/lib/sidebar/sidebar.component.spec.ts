import {
  DebugElement,
  NO_ERRORS_SCHEMA,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '@spryker/icon';
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
    })
      .overrideComponent(IconComponent, {
        set: {
          encapsulation: ViewEncapsulation.Emulated,
        },
      })
      .compileComponents();
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
  });

  it('should render proper icon', () => {
    fixture.detectChanges();
    const iconElement: HTMLElement = triggerButton.query(By.css('i'))
      .nativeElement;
    expect(iconElement.classList).toContain('anticon-arrow');
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
