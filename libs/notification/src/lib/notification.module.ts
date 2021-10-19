import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import {
  IconErrorModule,
  IconInfoModule,
  IconRemoveModule,
  IconSuccessModule,
  IconWarningModule,
} from '@spryker/icon/icons';
import { ApplyContextsModule, OfTypePipeModule } from '@spryker/utils';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { GlobalConfig, ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { NotificationWrapperComponent } from './notification-wrapper/notification-wrapper.component';
import { NotificationViewComponent } from './notification-view/notification-view.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationInputs } from './notification-inputs';
import { NotificationGlobalConfig } from './types';
import { mapDataToConfig } from './util';

@NgModule({
  imports: [
    CommonModule,
    NzAlertModule,
    ApplyContextsModule,
    IconModule,
    IconErrorModule,
    IconSuccessModule,
    IconWarningModule,
    IconInfoModule,
    IconRemoveModule,
    ToastrModule,
    ToastContainerModule,
    OfTypePipeModule,
  ],
  declarations: [
    NotificationComponent,
    NotificationViewComponent,
    NotificationWrapperComponent,
    NotificationInputs,
  ],
  exports: [NotificationViewComponent, NotificationComponent],
})
export class NotificationModule {
  static forRoot(config?: NotificationGlobalConfig): ModuleWithProviders<any> {
    let mappedConfig: Partial<GlobalConfig> = {
      maxOpened: config?.maxOpened ? config.maxOpened : 0,
      newestOnTop: config?.newestOnTop ? config.newestOnTop : true,
    };

    if (config) {
      mappedConfig = mapDataToConfig(config, mappedConfig);
    }

    return {
      ngModule: NotificationModule,
      providers: [ToastrModule.forRoot(mappedConfig).providers || []],
    };
  }
}
