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
} from '@spryker/table/features/testing';
import {
  TableColumnsResolverService,
  TableDataConfig,
  TableDataConfiguratorService,
  TableDataFetcherService,
} from '@spryker/table';
import { TableFiltersFeatureComponent } from './table-filters-feature.component';
import { PluckModule } from '@spryker/utils';
import { TableDummyFilterComponent } from './dummy-filter';
import { TABLE_FILTERS_TOKEN } from './tokens';
import { ReplaySubject } from 'rxjs';
import { LayoutFlatHostComponent } from '@orchestrator/layout';

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
          provide: TableDataFetcherService,
          useValue: 'TableDataFetcherService',
        },
        {
          provide: TableDataConfiguratorService,
          useClass: MockTableDataConfiguratorService,
        },
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

    fixture.detectChanges();
    tick();
  }));

  const filtersContainerSelector = '.ant-table-filters-feature';
  const filterSelector = 'spy-table-filter';

  function queryFiltersContainer(): DebugElement {
    return fixture.debugElement.query(By.css(filtersContainerSelector));
  }

  function queryFilter(): DebugElement {
    return fixture.debugElement.query(
      By.css(`${filtersContainerSelector} ${filterSelector}`),
    );
  }

  it('should render `ant-table-filters-feature` container block', () => {
    fixture.detectChanges();

    expect(queryFiltersContainer()).toBeTruthy();
  });

  it('should render filters inside `ant-table-filters-feature` container block', () => {
    fixture.detectChanges();

    expect(queryFilter()).toBeTruthy();
  });
});
