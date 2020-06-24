import { Inject, Injectable, Optional } from '@angular/core';
import {
  I18nConfig,
  I18nLocaleDataToken,
  I18nLocaleInterpolationData,
  LocaleService,
} from '@spryker/locale';
import { Observable, of } from 'rxjs';
import { InjectionTokenType } from '@spryker/utils';

@Injectable({
  providedIn: 'root',
})
export class I18nTestService {
  private localeData: Record<string, Record<string, unknown>> = {};
  setLocale = jest.fn();

  constructor() {}

  addLocaleData(token: string, data: I18nLocaleInterpolationData = {}): void {
    this.localeData[token] = data;
  }

  getLocaleData(token: string, key: string): unknown {
    return this.localeData[token][key];
  }

  translate(
    token: string,
    data?: I18nLocaleInterpolationData,
  ): Observable<string> {
    this.addLocaleData(token, data);
    return of(token);
  }
}
