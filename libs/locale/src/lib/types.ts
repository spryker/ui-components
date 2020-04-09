import { Type } from '@angular/core';
import { Observable } from 'rxjs';

// tslint:disable-next-line: no-empty-interface
export interface LocaleLoaderRegistry {}

export type LocaleLoaderMap = {
  [P in keyof LocaleLoaderRegistry]: LocaleLoader<LocaleLoaderRegistry[P]>;
};

export type LocaleLoaderRegistrarMap = {
  [P in keyof LocaleLoaderRegistry]-?: Type<
    LocaleLoaderRegistrar<LocaleLoaderRegistry[P]>
  >;
};

export interface LocaleRecord {
  id: string;
  default?: true;
  loaders?: LocaleLoaderMap;
}

export type LocaleLoader<T = unknown> = () => Promise<T>;

export interface LocaleLoaderRegistrar<T> {
  registerLocale(locale: string, data: T): Observable<unknown>;
  changeLocale?(locale: string): Observable<unknown>;
}
