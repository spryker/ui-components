import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestTableFeatureComponent } from '@spryker/table/features/testing';

import { TableSearchFeatureComponent } from './table-search-feature.component';
import { InputModule } from '@spryker/input';
import { IconModule } from '@spryker/icon';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'test-host',
  template: `
    <test-table-feature>
      <spy-table-search-feature></spy-table-search-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

describe('TableSearchFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;

  const inputSelector = 'spy-input';
  const iconSelector = 'spy-icon';

  function queryInput(): DebugElement {
    return fixture.debugElement.query(By.css(inputSelector));
  }

  function queryIcon(): DebugElement {
    return fixture.debugElement.query(By.css(iconSelector));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule, IconModule],
      declarations: [
        TableSearchFeatureComponent,
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

    fixture.detectChanges();
    tick();
    testTableFeature.featureMocks?.table.config$?.next({
      search: { placeholder: '123' },
    });
  }));

  it('should render `spy-input`', fakeAsync(() => {
    expect(queryInput()).toBeTruthy();
  }));

  it('should render `spy-icon`', fakeAsync(() => {
    expect(queryIcon()).toBeTruthy();
  }));

  it('should bind placeholder as AsyncPipe to input', fakeAsync(() => {
    fixture.detectChanges();
    const expectedValue = '123';

    const inputPlaceholder = fixture.debugElement.query(By.css('input'))
      .properties.placeholder;
    expect(inputPlaceholder).toBe(expectedValue);
  }));
});
