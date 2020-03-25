import { InjectionToken, Provider } from '@angular/core';

import { Icon } from './types';

export const ICONS_TOKEN = new InjectionToken<Icon[][]>('ICONS_TOKEN');

export function provideIcons(icons: Icon[]): Provider {
  return {
    provide: ICONS_TOKEN,
    useValue: icons,
    multi: true,
  };
}
