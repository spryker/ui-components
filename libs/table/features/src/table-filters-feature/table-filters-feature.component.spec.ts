import { By } from '@angular/platform-browser';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestTableFeatureComponent,
  TestTableFeatureMocks,
  TestTableFeatureTplDirective
} from '@spryker/table/features/testing';
import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDataFetcherService
} from '@spryker/table';
import { TableFiltersFeatureComponent } from './table-filters-feature.component';
import { PluckModule } from '@spryker/utils';
import { TableDummyFilterComponent } from "./dummy-filter";
import { TABLE_FILTERS_TOKEN } from './tokens';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-filters-feature></spy-table-filters-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

describe('TableFiltersFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PluckModule,
      ],
      declarations: [
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
          useValue: 'TableDataConfiguratorService',
        },
        {
          provide: TABLE_FILTERS_TOKEN,
          useValue: {
            filter: TableDummyFilterComponent as any,
          },
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

  const filtersContainer = '.ant-table-filters-feature';

  function queryFiltersContainer(): DebugElement {
    return fixture.debugElement.query(By.css(filtersContainer));
  }

  it('should create', () => {
    fixture.detectChanges();
    // expect(queryFiltersContainer()).toBeTruthy();
console.log(fixture.debugElement.query(By.css('spy-table-filter')));
    expect(fixture.debugElement.query(By.css('spy-table-filter'))).toBeTruthy();
  });
});
