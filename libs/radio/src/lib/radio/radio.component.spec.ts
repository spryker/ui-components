import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RadioComponent } from './radio.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';

@Component({
  selector: 'spy-test',
  template: `
    <spy-radio
      [value]="value"
      [disabled]="disabled"
      [hasError]="hasError"
      (selected)="selectedSpy($event)"
    ></spy-radio>
  `,
})
class TestComponent {
  value: any;
  disabled: any;
  hasError: any;
  selectedSpy = jest.fn();
}

@Component({
  selector: 'spy-test',
  template: `
    <spy-radio-group>
      <spy-radio
        [value]="value"
        [disabled]="disabled"
        [hasError]="hasError"
        (selected)="selectedSpy($event)"
      ></spy-radio>
    </spy-radio-group>
  `,
})
class TestGroupComponent {
  value: any;
  disabled: any;
  hasError: any;
  selectedSpy = jest.fn();
}

describe('RadioComponent', () => {
  describe('Single Radio', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, RadioComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
    });

    it('should render `label[nz-radio]`', () => {
      fixture.detectChanges();
      const labelElem = fixture.debugElement.query(By.css('label[nz-radio]'));

      expect(labelElem).toBeTruthy();
    });

    it('should bound @Input(value) to the input `nzValue` of `label` element', () => {
      const mockValue = 'mockValue';

      component.value = mockValue;
      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label'));

      expect(labelElem.properties.nzValue).toBe(mockValue);
    });

    it('should bound @Input(disabled) to the input `nzDisabled` of `label` element', () => {
      const mockDisabled = true;

      component.disabled = mockDisabled;
      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label'));

      expect(labelElem.properties.nzDisabled).toBe(mockDisabled);
    });

    it('should add `spy-radio--disabled` to the host if @Input(disabled) is `true`', () => {
      const radioComponent = fixture.debugElement.query(By.css('spy-radio'));

      expect('spy-radio--disabled' in radioComponent.classes).toBeFalsy();

      component.disabled = true;
      fixture.detectChanges();

      expect('spy-radio--disabled' in radioComponent.classes).toBeTruthy();
    });

    it('should add `spy-radio--error` to the host if @Input(hasError) is `true`', () => {
      const radioComponent = fixture.debugElement.query(By.css('spy-radio'));

      expect('spy-radio--error' in radioComponent.classes).toBeFalsy();

      component.hasError = true;
      fixture.detectChanges();

      expect('spy-radio--error' in radioComponent.classes).toBeTruthy();
    });

    it('should trigger `selected` callback when `ngModelChange` on `label` element was triggered', () => {
      const mockValue = 'mockValue';

      component.value = mockValue;
      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label'));

      labelElem.triggerEventHandler('ngModelChange', {});
      fixture.detectChanges();

      expect(component.selectedSpy).toHaveBeenCalledWith(mockValue);
    });
  });

  describe('Radio With Group Component', () => {
    let component: TestGroupComponent;
    let fixture: ComponentFixture<TestGroupComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TestGroupComponent, RadioComponent, RadioGroupComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestGroupComponent);
      component = fixture.componentInstance;
    });

    it('should bound @Input(value) to the input `nzValue` of `label` element', () => {
      const mockValue = 'mockValue';

      component.value = mockValue;
      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label'));

      expect(labelElem.properties.nzValue).toBe(mockValue);
    });

    it('should bound @Input(disabled) to the input `nzDisabled` of `label` element', () => {
      const mockDisabled = true;

      component.disabled = mockDisabled;
      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(By.css('label'));

      expect(labelElem.properties.nzDisabled).toBe(mockDisabled);
    });

    it('should add `spy-radio--disabled` to the `.spy-radio` if @Input(disabled) is `true`', () => {
      const radioElement = fixture.debugElement.query(By.css('.spy-radio'));

      expect('spy-radio--disabled' in radioElement.classes).toBeFalsy();

      component.disabled = true;
      fixture.detectChanges();

      expect('spy-radio--disabled' in radioElement.classes).toBeTruthy();
    });

    it('should add `spy-radio--error` to the `.spy-radio` if @Input(hasError) is `true`', () => {
      const radioElement = fixture.debugElement.query(By.css('.spy-radio'));

      expect('spy-radio--error' in radioElement.classes).toBeFalsy();

      component.hasError = true;
      fixture.detectChanges();

      expect('spy-radio--error' in radioElement.classes).toBeTruthy();
    });
  });
});
