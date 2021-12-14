import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

import { DropdownModule } from '../dropdown.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DropdownComponent', () => {
  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test',
    template: `
      <spy-dropdown
        [items]="items"
        [placement]="placement"
        [visible]="visible"
        [disabled]="disabled"
        (visibleChange)="visibleChangeSpy($event)"
        (actionTriggered)="actionTriggeredSpy(action)"
      ></spy-dropdown>
    `,
  })
  class TestComponent {
    items: any;
    placement: any;
    visible: any;
    disabled: any;
    visibleChangeSpy = jest.fn();
    actionTriggeredSpy = jest.fn();
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule, NoopAnimationsModule],
      declarations: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));
  afterEach(() => {
    fixture.destroy();
  });

  it('template must render span and nz-dropdown-menu from Ant Design', () => {
    const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
    const nzDropdownElem = fixture.debugElement.query(
      By.css('nz-dropdown-menu'),
    );

    expect(spanElem).toBeTruthy();
    expect(nzDropdownElem).toBeTruthy();
  });

  describe('Inputs must be bound to span', () => {
    it('should bind placement to nzPlacement of nz-dropdown', () => {
      const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
      const mockedValue = 'bottomLeft';

      component.placement = mockedValue;

      fixture.detectChanges();

      expect(spanElem.attributes['ng-reflect-nz-placement']).toBe(mockedValue);
    });

    it('should bind disabled to nzDisabled of nz-dropdown', () => {
      const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
      component.disabled = true;

      const mockedValue = 'bottomLeft';
      component.placement = mockedValue;

      fixture.detectChanges();

      expect(spanElem.attributes['ng-reflect-nz-disabled']).toBe('true');
    });

    it('should bind visible to nzVisible of nz-dropdown', () => {
      const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));
      component.visible = true;

      const mockedValue = 'bottomLeft';
      component.placement = mockedValue;

      fixture.detectChanges();

      expect(spanElem.attributes['ng-reflect-nz-visible']).toBe('true');
    });
  });

  it('visibleChange must be emitted every time nzVisibleChange emits with $event', () => {
    const spanElem = fixture.debugElement.query(By.css('span[nz-dropdown]'));

    const mockedValue = 'bottomLeft';
    component.placement = mockedValue;

    spanElem.triggerEventHandler('nzVisibleChange', false);
    fixture.detectChanges();

    expect(component.visibleChangeSpy).toHaveBeenCalledWith(false);
  });
});
