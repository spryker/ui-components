import { Component, DebugElement, Input, TemplateRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidebarModule } from '../sidebar.module';

describe('SidebarComponent', () => {
  let triggerButton: DebugElement;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  @Component({
    template: `
      <spy-sidebar
        [trigger]="trigger"
        (collapsedChange)="sidebarCollapsed($event)"
      >
        <div>Sidebar content</div>
      </spy-sidebar>
      <ng-template #trigger><span><</span></ng-template>
    `,
  })
  class TestComponent {
    @Input() trigger: null | TemplateRef<void> = null;
    @Input() collapsed: boolean = false;

    sidebarCollapsed = jest.fn($event => $event);
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

    triggerButton = fixture.debugElement.query(
      By.css('.ant-layout-sider-trigger'),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create trigger button', () => {
    expect(triggerButton).toBeTruthy();
  });

  it('should trigger sidebar', () => {
    triggerButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.sidebarCollapsed).toHaveBeenCalled();
  });

  it('should change sidebar collapse status', () => {
    triggerButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.sidebarCollapsed.mock.calls.length).toEqual(1);
    expect(component.sidebarCollapsed.mock.results[0].value).toBeTruthy();
  });
});
