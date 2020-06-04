import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { IconModule } from '@spryker/icon';
import {
  IconErrorModule,
  IconInfoModule,
  IconRemoveModule,
  IconSuccessModule,
  IconWarningModule,
} from '@spryker/icon/icons';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { NotificationComponent } from './notification/notification.component';
import { ToastrModule, GlobalConfig, ToastContainerModule } from 'ngx-toastr';
import { NotificationGlobalConfig } from './types';
import { NotificationWrapperComponent } from './notification-wrapper/notification-wrapper.component';
import { mapDataToConfig } from './util';

@NgModule({
  imports: [
    CommonModule,
    NzAlertModule,
    IconModule,
    IconErrorModule,
    IconSuccessModule,
    IconWarningModule,
    IconInfoModule,
    IconRemoveModule,
    ToastrModule,
    ToastContainerModule,
  ],
  declarations: [NotificationComponent, NotificationWrapperComponent],
  exports: [NotificationComponent, NotificationWrapperComponent],
})
export class NotificationModule {
  static forRoot(config?: NotificationGlobalConfig): ModuleWithProviders {
    let mappedConfig: Partial<GlobalConfig> = {
      toastComponent: NotificationWrapperComponent,
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
