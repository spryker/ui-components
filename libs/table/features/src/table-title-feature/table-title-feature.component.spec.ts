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
import { TableTitleFeatureComponent } from './table-title-feature.component';
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
      <spy-table-title-feature></spy-table-title-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

describe('TableTitleFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;

  const spanSelector = 'span';

  function querySpan(): DebugElement {
    return fixture.debugElement.query(By.css(spanSelector));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputModule],
      declarations: [
        TestTableFeatureTplDirective,
        TableTitleFeatureComponent,
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
              title: 'Table Title',
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

  it('should render `span` with table title', fakeAsync(() => {
    fixture.detectChanges();
    const expectedValue = 'Table Title';

    const spanPlaceholder = querySpan().nativeElement.innerHTML;
    expect(spanPlaceholder).toBe(expectedValue);
  }));
});
