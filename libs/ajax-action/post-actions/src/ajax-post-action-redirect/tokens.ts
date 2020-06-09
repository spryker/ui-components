import { InjectionToken } from '@angular/core';

export function browserWindowFactory(): Window {
  return window;
}

export const WindowToken = new InjectionToken<Window>('WindowToken', {
  providedIn: 'root',
  factory: browserWindowFactory,
});
