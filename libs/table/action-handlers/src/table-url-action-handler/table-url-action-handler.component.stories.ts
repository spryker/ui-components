import {
  HttpClientTestingModule,
  TestRequest,
} from '@angular/common/http/testing';
import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  NgModule,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { NotificationModule } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableDatasourceHttpService } from '@spryker/table/datasources';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { NotificationWrapperComponent } from '../../../../notification/src/lib/notification-wrapper/notification-wrapper.component';
import { TableUrlActionHandlerModule } from './table-url-action-handler.module';
import { TableUrlActionHandlerService } from './table-url-action-handler.service';

export default {
  title: 'TableUrlActionHandlerComponent',
};

@Component({
  selector: 'spy-story',
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
})
class StoryComponent {
  constructor() {}
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TableModule.withActions({
      url: TableUrlActionHandlerService,
    }),
    TableModule.forRoot(),
    TableModule.withDatasourceTypes({
      http: TableDatasourceHttpService,
    }),
    TableModule.withFeatures({
      rowActions: () =>
        import('@spryker/table/features').then(
          m => m.TableRowActionsFeatureModule,
        ),
    }),
    NotificationModule.forRoot(),
    HttpClientTestingModule,
    MockHttpModule,
    TableUrlActionHandlerModule,
    DefaultContextSerializationModule,
  ],
  providers: [
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      useValue: [NotificationWrapperComponent],
      multi: true,
    },
  ],
  declarations: [StoryComponent],
})
class StoryModule {}

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

const actionResponse = (request: TestRequest): any => ({
  notifications: [
    {
      type: 'info',
      message: 'message',
    },
  ],
});

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  component: StoryComponent,
  props: {
    config: {
      dataSource: {
        type: 'http',
        url: '/data-request',
      },
      columns: [
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
      ],
      rowActions: {
        enabled: true,
        rowIdPath: 'col1',
        actions: [
          {
            id: 'click',
            title: 'test-click',
            type: 'url',
            typeOptions: {
              url: '/mock-url?${rowId}',
            },
          },
          {
            id: 'click2',
            title: 'test-click-2',
            type: 'url',
            typeOptions: {
              url: '/mock-url?${row.col2}',
            },
          },
        ],
      },
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
      },
      {
        url: /^\/mock-url/,
        dataFn: actionResponse,
      },
    ]),
  },
});
