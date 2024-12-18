import { GlobalConfig } from 'ngx-toastr';

import { NotificationData, NotificationGlobalConfig, NotificationPosition } from './types';

export function mapDataToConfig(
    config: NotificationGlobalConfig | NotificationData,
    mappedConfig: Partial<GlobalConfig>,
) {
    mappedConfig = { ...mappedConfig };
    mappedConfig.timeOut = config.timeOut ?? mappedConfig.timeOut;
    mappedConfig.easing = config.easing ?? mappedConfig.easing;
    mappedConfig.easeTime = config.easeTime ?? mappedConfig.easeTime;
    mappedConfig.positionClass = mapPositionClass(config.position);
    mappedConfig.disableTimeOut = config.disableTimeOut ?? mappedConfig.disableTimeOut ?? mappedConfig.timeOut === 0;
    mappedConfig.closeButton = (config as NotificationData).closeable ?? mappedConfig.closeButton;

    return mappedConfig;
}

const positionMap = {
    [NotificationPosition.TopLeft]: 'toast-top-left',
    [NotificationPosition.BottomRight]: 'toast-bottom-right',
    [NotificationPosition.BottomLeft]: 'toast-bottom-left',
} as Record<NotificationPosition, string | undefined>;

function mapPositionClass(position?: NotificationPosition): string {
    const mappedPosition = position ? positionMap[position] : undefined;
    return mappedPosition ?? 'toast-top-right';
}
