import { Injectable } from '@angular/core';
import { I18nLocaleInterpolationData } from '@spryker/locale';

@Injectable({
  providedIn: 'root',
})
export class I18nTestService {
  localeData: Record<string, Record<string, unknown>> = {};

  addLocaleData(token: string, data: I18nLocaleInterpolationData = {}): void {
    this.localeData[token] = data;
  }

  getLocaleData(token: string, key: string): unknown {
    return this.localeData[token][key];
  }
}
