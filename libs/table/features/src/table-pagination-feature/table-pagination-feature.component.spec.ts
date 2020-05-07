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
import { TablePaginationFeatureComponent } from './table-pagination-feature.component';
import {
  TableColumnsResolverService, TableData, TableDataConfig,
  TableDataConfiguratorService,
  TableDataFetcherService,
} from '@spryker/table';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-pagination-feature></spy-table-pagination-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

describe('TablePaginationFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;
  const mockSizes = [10, 50, 100];

  const paginationSelector = 'spy-pagination';

  function queryPagination(): DebugElement {
    return fixture.debugElement.query(By.css(paginationSelector));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestTableFeatureTplDirective,
        TablePaginationFeatureComponent,
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
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
              sizes: mockSizes,
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
      page: 3,
      pageSize: 30,
      total: 10,
    };

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);
    fixture.detectChanges();
  }));

  it('should render `spy-pagination`', fakeAsync(() => {
    expect(queryPagination()).toBeTruthy();
  }));

  it('should bind `total` by default to `total` property of `spy-pagination`', fakeAsync(() => {
    expect(queryPagination().properties.total).toBe(mockData.total);
  }));

  it('should bind `page` by default to `page` property of `spy-pagination`', fakeAsync(() => {
    expect(queryPagination().properties.page).toBe(mockData.page);
  }));

  it('should bind `pageSize` by default to `pageSize` property of `spy-pagination`', fakeAsync(() => {
    expect(queryPagination().properties.pageSize).toBe(mockData.pageSize);
  }));

  it('should bind `sizes` by default to `pageSizeOptions` property of `spy-pagination`', fakeAsync(() => {
    expect(queryPagination().properties.pageSizeOptions).toEqual(mockSizes);
  }));
});
