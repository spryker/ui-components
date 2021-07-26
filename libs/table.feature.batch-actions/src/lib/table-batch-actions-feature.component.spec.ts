import { Component, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TableActionsService,
  TableColumnsResolverService,
  TableData,
  TableDataConfig,
  TableDataConfiguratorService,
  TableDatasourceService,
} from '@spryker/table';
import {
  TestTableFeatureComponent,
  TestTableFeatureMocks,
  TestTableFeatureTplDirective,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { ReplaySubject } from 'rxjs';

import { TableBatchActionsFeatureComponent } from './table-batch-actions-feature.component';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-batch-actions-feature></spy-table-batch-actions-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

const mockActionsWithoutAvailableActionsPathConfig = {
  noActionsMessage: 'No available actions for selected rows',
  rowIdPath: 'sku',
  actions: [
    {
      id: 'update-offer',
      title: 'Update Offer(s)',
      type: 'form-overlay',
      typeOptions: {
        url: 'https://.../?ids=${rowIds}',
        method: 'GET',
      },
    },
    {
      id: 'ship',
      title: 'Ship',
      type: 'html-overlay',
      typeOptions: {
        url: 'https://.../?ids=${rowIds}',
        method: 'GET',
      },
    },
  ],
};

const mockActionsConfig = {
  availableActionsPath: '_actionIds',
  ...mockActionsWithoutAvailableActionsPathConfig,
};

class TableMockActionsService {
  trigger = jest.fn();
}

describe('TableBatchActionsFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;

  describe('Table with availableActionsPath config property', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DefaultContextSerializationModule],
        declarations: [
          TestTableFeatureTplDirective,
          TableBatchActionsFeatureComponent,
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
            useClass: MockTableDataConfiguratorService,
          },
          {
            provide: TableActionsService,
            useClass: TableMockActionsService,
          },
          {
            provide: TestTableFeatureMocks,
            useValue: {
              config: {
                enabled: true, // This will enable feature via config
                ...mockActionsConfig,
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

    it('should render `spy-button` with text from appropriate TableBatchAction.title', () => {
      testTableFeature.featureMocks?.table.eventBus?.emit('itemSelection', [
        {
          data: {},
        },
      ]);

      fixture.detectChanges();

      const buttonElems = fixture.debugElement.queryAll(By.css('spy-button'));

      expect(buttonElems.length).toBe(mockActionsConfig.actions.length);

      buttonElems.forEach((buttonElem, i) => {
        expect(buttonElem).toBeTruthy();
        expect(buttonElem.nativeElement.textContent).toContain(
          mockActionsConfig.actions[i].title,
        );
      });
    });

    it('should render `spy-button` with common actions if intersection col exist', () => {
      testTableFeature.featureMocks?.table.eventBus?.emit('itemSelection', [
        {
          data: {
            [mockActionsConfig.availableActionsPath]: ['update-offer'],
          },
        },
        {
          data: {
            [mockActionsConfig.availableActionsPath]: ['update-offer', 'ship'],
          },
        },
      ]);

      fixture.detectChanges();

      const buttonElems = fixture.debugElement.queryAll(By.css('spy-button'));
      const intersectedAction = mockActionsConfig.actions.find(
        (item) => item.id === 'update-offer',
      );

      expect(buttonElems.length).toBe(1);
      expect(buttonElems[0].nativeElement.textContent).toContain(
        intersectedAction?.title,
      );
    });

    it('should render `spy-notification` with text from TableBatchActionsConfig.noActionsMessage if intersection of available actions do not exist', () => {
      testTableFeature.featureMocks?.table.eventBus?.emit('itemSelection', [
        {
          data: {
            [mockActionsConfig.availableActionsPath]: ['update-offer'],
          },
        },
        {
          data: {
            [mockActionsConfig.availableActionsPath]: ['ship'],
          },
        },
      ]);

      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification'),
      );
      const buttonElem = fixture.debugElement.query(By.css('spy-button'));

      expect(notificationElem).toBeTruthy();
      expect(buttonElem).toBeFalsy();
      expect(notificationElem.nativeElement.textContent).toContain(
        mockActionsConfig.noActionsMessage,
      );
    });

    it('should render nothing if rows have not been selected', () => {
      fixture.detectChanges();

      const notificationElem = fixture.debugElement.query(
        By.css('spy-notification'),
      );
      const buttonElem = fixture.debugElement.query(By.css('spy-button'));

      expect(notificationElem).toBeFalsy();
      expect(buttonElem).toBeFalsy();
    });
  });

  describe('Table without availableActionsPath config property', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DefaultContextSerializationModule],
        declarations: [
          TestTableFeatureTplDirective,
          TableBatchActionsFeatureComponent,
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
            useClass: MockTableDataConfiguratorService,
          },
          {
            provide: TableActionsService,
            useClass: TableMockActionsService,
          },
          {
            provide: TestTableFeatureMocks,
            useValue: {
              config: {
                enabled: true, // This will enable feature via config
                ...mockActionsWithoutAvailableActionsPathConfig,
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

    it('should render `spy-button` with text from appropriate TableBatchAction.title', () => {
      testTableFeature.featureMocks?.table.eventBus?.emit('itemSelection', [
        {
          data: {},
        },
      ]);

      fixture.detectChanges();

      const buttonElems = fixture.debugElement.queryAll(By.css('spy-button'));

      expect(buttonElems.length).toBe(mockActionsConfig.actions.length);

      buttonElems.forEach((buttonElem, i) => {
        expect(buttonElem).toBeTruthy();
        expect(buttonElem.nativeElement.textContent).toContain(
          mockActionsConfig.actions[i].title,
        );
      });
    });
  });
});
