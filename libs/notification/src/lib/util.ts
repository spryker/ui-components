import { NotificationGlobalConfig, NotificationData } from './types';
import { GlobalConfig } from 'ngx-toastr';

export function mapDataToConfig(
  config: NotificationGlobalConfig | NotificationData,
  mappedConfig: Partial<GlobalConfig>,
) {
  mappedConfig.timeOut = config.timeOut ?? mappedConfig.timeOut;
  mappedConfig.easing = config.easing ?? mappedConfig.easing;
  mappedConfig.easeTime = config.easeTime ?? mappedConfig.easeTime;
  mappedConfig.positionClass = mapPositionClass(config.position as string);

  return mappedConfig;
}

function mapPositionClass(position: string): string {
  let mappedValue = 'toast-top-right';
  switch (position) {
    case 'topLeft':
      mappedValue = 'toast-top-left';
      break;
    case 'bottomRight':
      mappedValue = 'toast-bottom-right';
      break;
    case 'bottomLeft':
      mappedValue = 'toast-bottom-left';
      break;
  }

  return mappedValue;
}
