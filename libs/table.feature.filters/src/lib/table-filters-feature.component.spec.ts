import { By } from '@angular/platform-browser';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  TestTableFeatureComponent,
  TestTableFeatureMocks,
  TestTableFeatureTplDirective,
} from '@spryker/table/testing';
import {
  TableColumnsResolverService,
  TableData,
  TableDataConfig,
  TableDataConfiguratorService,
  TableDatasourceService,
} from '@spryker/table';
import { TableFiltersFeatureComponent } from './table-filters-feature.component';
import { PluckModule } from '@spryker/utils';
import { TableDummyFilterComponent } from '@spryker/table.feature.filters/testing';
import { TABLE_FILTERS_TOKEN } from './tokens';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-filters-feature></spy-table-filters-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

describe('TableFiltersFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PluckModule],
      declarations: [
        TableDummyFilterComponent,
        TestTableFeatureTplDirective,
        TableFiltersFeatureComponent,
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
          provide: TABLE_FILTERS_TOKEN,
          useValue: {
            filter: TableDummyFilterComponent as any,
          },
          multi: true,
        },
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [TableDummyFilterComponent],
          multi: true,
        },
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
              items: [
                {
                  id: 'filter',
                  title: 'Filter',
                  type: 'filter',
                  typeOptions: {
                    value: 'This is dummy input filter',
                  },
                },
              ],
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
    testTableFeature.featureMocks?.table.isLoading$?.next(true);
    TestBed.inject(MockTableDataConfiguratorService).config$.next({});
    fixture.detectChanges();
  }));

  const filtersContainerSelector = '.spy-table-filters-feature';
  const filterSelector = 'spy-table-filter';

  function queryFiltersContainer(): DebugElement {
    return fixture.debugElement.query(By.css(filtersContainerSelector));
  }

  function queryFilter(): DebugElement {
    return fixture.debugElement.query(
      By.css(`${filtersContainerSelector} ${filterSelector}`),
    );
  }

  it('should render `spy-table-filters-feature` container block', () => {
    fixture.detectChanges();

    expect(queryFiltersContainer()).toBeTruthy();
  });

  it('should render filters inside `spy-table-filters-feature` container block', () => {
    fixture.detectChanges();

    expect(queryFilter()).toBeTruthy();
  });
});
