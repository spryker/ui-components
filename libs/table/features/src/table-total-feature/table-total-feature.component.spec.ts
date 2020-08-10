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
import { TableTotalFeatureComponent } from './table-total-feature.component';
import {
  TableColumnsResolverService,
  TableData,
  TableDataConfiguratorService,
  TableDatasourceService,
} from '@spryker/table';
import { PluckModule } from '@spryker/utils';
import { TestLocaleModule, I18nTestService } from '@spryker/locale/testing';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-total-feature></spy-table-total-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

describe('TableTotalFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;
  let service: I18nTestService;

  const totalContainer = '.spy-table-total-feature';

  function queryTotal(): DebugElement {
    return fixture.debugElement.query(By.css(totalContainer));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PluckModule, TestLocaleModule],
      declarations: [
        TestTableFeatureTplDirective,
        TableTotalFeatureComponent,
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
          useValue: 'TableDataConfiguratorService',
        },
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
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

    service = TestBed.inject(I18nTestService);

    mockData = {
      data: [{}],
      page: 0,
      pageSize: 0,
      total: 10,
    };

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);
    fixture.detectChanges();
  }));

  it('should render `.table-total-feature`', fakeAsync(() => {
    expect(queryTotal()).toBeTruthy();
  }));

  it('should render number of total items', fakeAsync(() => {
    const token = 'table.total:number';

    expect(queryTotal().nativeElement.textContent).toContain(token);
    expect(service.getLocaleData(token, 'number')).toBe(mockData.total);
  }));

  it('should render number of selected items', fakeAsync(() => {
    const selectedItemsArr = [{}, {}, {}];
    const token = 'table.selected:number';

    testTableFeature.featureMocks?.table?.eventBus?.emit(
      'itemSelection',
      selectedItemsArr,
    );

    fixture.detectChanges();

    expect(queryTotal().nativeElement.textContent).toContain(token);
    expect(service.getLocaleData(token, 'number')).toBe(
      selectedItemsArr.length,
    );
  }));
});
