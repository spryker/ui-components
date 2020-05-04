import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableData } from '@spryker/table';
import { TestTableFeatureComponent } from '@spryker/table/features/testing';

import { TableSelectableFeatureComponent } from './table-selectable-feature.component';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-selectable-feature
        (selectionChange)="selectionChange($event)"
      ></spy-table-selectable-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {
  selectionChange = jest.fn();
}

describe('TableSelectableFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;

  const headerCheckboxSelector = '.template spy-checkbox';
  const columnCheckboxSelector = '.column-template spy-checkbox';

  function queryHeaderCheckbox(): DebugElement {
    return fixture.debugElement.query(By.css(headerCheckboxSelector));
  }

  function queryColumnCheckbox(): DebugElement {
    return fixture.debugElement.query(By.css(columnCheckboxSelector));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableSelectableFeatureComponent,
        TestHostComponent,
        TestTableFeatureComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testTableFeature = fixture.debugElement.query(
      By.directive(TestTableFeatureComponent),
    ).componentInstance;

    mockData = {
      data: [{}],
      page: 0,
      size: 0,
      total: 0,
    };

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);
  }));

  describe('header template', () => {
    it('should render `spy-checkbox`', fakeAsync(() => {
      expect(queryHeaderCheckbox()).toBeTruthy();
    }));

    it('should bind `false` by default to `checked` property of `spy-checkbox`', fakeAsync(() => {
      expect(queryHeaderCheckbox().properties.checked).toBe(false);
    }));

    it('should bind `false` by default to `indeterminate` input of `spy-checkbox``', fakeAsync(() => {
      expect(queryHeaderCheckbox().properties.indeterminate).toBe(false);
    }));

    it('should toggle column checkbox when checked', fakeAsync(() => {
      queryHeaderCheckbox().triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      expect(queryColumnCheckbox().properties.checked).toBe(true);

      queryHeaderCheckbox().triggerEventHandler('checkedChange', false);

      fixture.detectChanges();

      expect(queryColumnCheckbox().properties.checked).toBe(false);
    }));

    it('should emit `selectionChange` with data when check changes', fakeAsync(() => {
      queryHeaderCheckbox().triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      expect(fixture.componentInstance.selectionChange).toHaveBeenCalledWith([
        mockData.data[0],
      ]);

      queryHeaderCheckbox().triggerEventHandler('checkedChange', false);

      fixture.detectChanges();

      expect(fixture.componentInstance.selectionChange).toHaveBeenCalledWith(
        [],
      );
    }));
  });

  describe('column template', () => {
    it('should render `spy-checkbox`', fakeAsync(() => {
      expect(queryColumnCheckbox()).toBeTruthy();
    }));

    it('should bind `false` by default to `checked` property of `spy-checkbox`', fakeAsync(() => {
      expect(queryColumnCheckbox().properties.checked).toBeFalsy();
    }));

    it('should set check checkbox when it is checked', fakeAsync(() => {
      const columnCheckboxElem = queryColumnCheckbox();

      expect(columnCheckboxElem.properties.checked).toBeFalsy();

      columnCheckboxElem.triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      expect(columnCheckboxElem.properties.checked).toBe(true);
    }));

    it('should check header checkbox when all checked', fakeAsync(() => {
      queryColumnCheckbox().triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      expect(queryHeaderCheckbox().properties.checked).toBe(true);
    }));

    it('should set header checkbox indeterminate when some checked', fakeAsync(() => {
      mockData.data = [{}, {}]; // This will simulate partial check
      testTableFeature.featureMocks?.table.data$?.next(mockData);

      fixture.detectChanges();

      queryColumnCheckbox().triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      expect(queryHeaderCheckbox().properties.checked).toBe(false);
      expect(queryHeaderCheckbox().properties.indeterminate).toBe(true);
    }));

    it('should call `TableComponent.updateRowClasses` when checked changes', fakeAsync(() => {
      queryColumnCheckbox().triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      // Verify class set
      expect(
        testTableFeature.featureMocks?.table.updateRowClasses,
      ).toHaveBeenCalledWith('0', { 'ant-table-row--selected': true });

      queryColumnCheckbox().triggerEventHandler('checkedChange', false);

      fixture.detectChanges();

      // Verify class unset
      expect(
        testTableFeature.featureMocks?.table.updateRowClasses,
      ).toHaveBeenCalledWith('0', { 'ant-table-row--selected': false });
    }));

    it('should emit `selectionChange` with data when check changes', fakeAsync(() => {
      queryColumnCheckbox().triggerEventHandler('checkedChange', true);

      fixture.detectChanges();

      expect(fixture.componentInstance.selectionChange).toHaveBeenCalledWith([
        mockData.data[0],
      ]);

      queryColumnCheckbox().triggerEventHandler('checkedChange', false);

      fixture.detectChanges();

      expect(fixture.componentInstance.selectionChange).toHaveBeenCalledWith(
        [],
      );
    }));
  });
});
