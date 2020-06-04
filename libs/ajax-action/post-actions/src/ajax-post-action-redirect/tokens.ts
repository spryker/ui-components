import { InjectionToken } from '@angular/core';

export function getWindowObject(): Window {
  return window;
}

export const WindowToken = new InjectionToken<Window>('WindowToken', {
  providedIn: 'root',
  factory: getWindowObject,
});
