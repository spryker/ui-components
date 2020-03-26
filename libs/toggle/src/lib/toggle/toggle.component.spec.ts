import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  @Component({
    selector: 'test-component',
    template: `
      <spy-toggle
        [name]="name"
        [value]="value"
        [disabled]="disabled"
        (valueChange)="changeSpy()"
      ></spy-toggle>
    `,
  })
  class TestComponent {
    name: any;
    value: any;
    disabled: any = false;
    changeSpy = jest.fn();
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ToggleComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('template must render nz-switch component from Ant Design with input type="hidden"', () => {
    const nzSwitchElem = fixture.debugElement.query(By.css('nz-switch'));
    expect(nzSwitchElem).toBeTruthy();

    const inputElem = fixture.debugElement.query(By.css('input[type=hidden]'));
    expect(inputElem).toBeTruthy();
  });

  describe('Input name must be bound to input', () => {
    it('should bind name to attribute name of input', () => {
      const inputElem = fixture.debugElement.query(
        By.css('input[type=hidden]'),
      );
      const mockedValue = 'testValue';

      component.name = mockedValue;

      fixture.detectChanges();

      expect(inputElem.attributes.name).toBe(mockedValue);
    });
  });

  describe('Input value and disabled must be bound to nz-switch', () => {
    it('should bind value to nz-switch and changing value should provide changing the same state for input', () => {
      const nzSwitchElem = fixture.debugElement.query(By.css('nz-switch'));
      const inputElem = fixture.debugElement.query(
        By.css('input[type=hidden]'),
      );
      const mockedValue = true;

      component.value = mockedValue;

      fixture.detectChanges();

      expect(nzSwitchElem.properties.ngModel).toBe(mockedValue);
      expect(inputElem.properties.ngModel).toBe(mockedValue);
    });

    it('should bind disabled to nzDisabled of nz-switch', () => {
      const nzSwitchElem = fixture.debugElement.query(By.css('nz-switch'));
      const mockedDisabledProp = true;

      component.disabled = mockedDisabledProp;

      fixture.detectChanges();

      expect(nzSwitchElem.properties.nzDisabled).toBe(mockedDisabledProp);
    });
  });

  describe('valueChange', () => {
    it('valueChange must be emitted every time ngModelChange emits from nz-switch', () => {
      const nzSwitchElem = fixture.debugElement.query(By.css('nz-switch'));

      nzSwitchElem.triggerEventHandler('ngModelChange', {});
      fixture.detectChanges();

      expect(component.changeSpy).toHaveBeenCalled();
    });
  });
});
