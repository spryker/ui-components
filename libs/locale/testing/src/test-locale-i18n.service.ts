import { Injectable } from '@angular/core';
import { I18nLocaleInterpolationData } from '@spryker/locale';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nTestService {
  private localeData: Record<string, Record<string, unknown>> = {};

  setLocale = jest.fn();

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
