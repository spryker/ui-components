import { Component, Input, TemplateRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidebarModule } from '../sidebar.module';

describe('SidebarComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    template: `
      <spy-sidebar
        [trigger]="trigger"
        (collapsedChange)="siderCollapsed($event)"
      >
        <div>Sidebar content</div>
      </spy-sidebar>
      <ng-template #trigger><span><</span></ng-template>
    `,
  })
  class TestComponent {
    @Input() trigger: null | TemplateRef<void> = null;
    @Input() collapsed: boolean = false;

    siderCollapsed = jest.fn();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SidebarModule],
      declarations: [TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger sidebar', () => {
    const triggerButton = fixture.debugElement.query(
      By.css('.ant-layout-sider-trigger'),
    );

    expect(triggerButton).toBeTruthy();

    triggerButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.siderCollapsed).toHaveBeenCalled();
  });
});
