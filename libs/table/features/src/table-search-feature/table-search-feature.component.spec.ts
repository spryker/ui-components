import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TestTableFeatureTplDirective,
  TestTableFeatureComponent,
  TestTableFeatureMocks,
} from '@spryker/table/features/testing';
import { TableSearchFeatureComponent } from './table-search-feature.component';
import {
  TableColumnsResolverService,
  TableData,
  TableDataConfig,
  TableDataConfiguratorService,
  TableDatasourceService,
} from '@spryker/table';
import { ReplaySubject } from 'rxjs';
import { InputModule } from '@spryker/input';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-search-feature></spy-table-search-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  config$ = new ReplaySubject<TableDataConfig>(1);
}

describe('TableSearchFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;

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
      imports: [InputModule],
      declarations: [
        TestTableFeatureTplDirective,
        TableSearchFeatureComponent,
        TestTableFeatureComponent,
        TestHostComponent,
      ],
      providers: [
        {
          provide: TableColumnsResolverService,
          useValue: 'TableColumnsResolverService',
        },
        {
          provide: TableDatasourceService,
          useValue: 'TableDatasourceService',
        },
        {
          provide: TableDataConfiguratorService,
          useExisting: MockTableDataConfiguratorService,
        },
        MockTableDataConfiguratorService,
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
              placeholder: '123',
            },
          },
        },
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
      pageSize: 0,
      total: 10,
    };

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);
    TestBed.inject(MockTableDataConfiguratorService).config$.next({});
    fixture.detectChanges();
  }));

  it('should render `spy-input`', fakeAsync(() => {
    expect(queryInput()).toBeTruthy();
  }));

  it('should render `spy-icon`', fakeAsync(() => {
    expect(queryIcon()).toBeTruthy();
  }));

  it('should bind placeholder to input', fakeAsync(() => {
    fixture.detectChanges();
    const expectedValue = '123';

    const inputPlaceholder = fixture.debugElement.query(By.css('input'))
      .properties.placeholder;
    expect(inputPlaceholder).toBe(expectedValue);
  }));
});
