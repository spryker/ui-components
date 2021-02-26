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
import { AjaxFormResponse } from '@spryker/ajax-form';
import { DatasourceModule } from '@spryker/datasource';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule, NotificationType } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { DrawerContainerProxyComponent } from '../../../drawer/src/lib/drawer-container/drawer-container-proxy.component';
import { NotificationWrapperComponent } from '../../../notification/src/lib/notification-wrapper/notification-wrapper.component';
import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { TableFormOverlayActionHandlerModule } from './table-form-overlay-action-handler.module';
import { TableFormOverlayActionHandlerService } from './table-form-overlay-action-handler.service';

export default {
  title: 'TableFormOverlayActionHandlerComponent',
};

@Component({
  selector: 'spy-story',
  template: ` <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table> `,
})
class StoryComponent {}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TableModule.withActions({
      'form-overlay': TableFormOverlayActionHandlerService,
    }),
    TableModule.forRoot(),
    DatasourceModule.withDatasources({
      'mock-data': MockTableDatasourceService,
    }),
    TableModule.withFeatures({
      rowActions: () =>
        import('@spryker/table.feature.row-actions').then(
          (m) => m.TableRowActionsFeatureModule,
        ),
    }),
    NotificationModule.forRoot(),
    HttpClientTestingModule,
    MockHttpModule,
    TableFormOverlayActionHandlerModule,
    DefaultContextSerializationModule,
    LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
    EnLocaleModule,
  ],
  providers: [
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      useValue: [
        DrawerContainerProxyComponent,
        TableFormOverlayActionHandlerComponent,
        NotificationWrapperComponent,
      ],
      multi: true,
    },
  ],
  declarations: [StoryComponent],
})
class StoryModule {}

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

const mockHtmlTemplate = () => `
  Form Overlay
  <br />
  <input type="text" name="name">
  <button type="submit">Submit</button>
`;

const tableResponse = (request: TestRequest): AjaxFormResponse => ({
  form: mockHtmlTemplate(),
  notifications:
    request.request.method === 'POST'
      ? [
          {
            type: NotificationType.Info,
            message: 'message',
          },
        ]
      : [],
});

export const primary = () => ({
  moduleMetadata: {
    imports: [StoryModule],
  },
  component: StoryComponent,
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
      columns: [
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
      ],
      rowActions: {
        enabled: true,
        actions: [
          {
            id: '1234',
            title: '123',
            type: 'form-overlay',
            typeOptions: {
              url: '/mock-url?${row.col1}',
              method: 'POST',
            },
          },
        ],
        click: '1234',
      },
    },
    mockHttp: setMockHttp([
      {
        url: /^\/mock-url/,
        dataFn: tableResponse,
      },
    ]),
  },
});
