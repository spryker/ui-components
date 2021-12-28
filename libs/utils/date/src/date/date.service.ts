import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { InjectionTokenType } from '@spryker/utils';
import { DateAdapterToken } from './token';
import { DateAdapter } from './types';

@Injectable({
  providedIn: 'root',
})
export class DateService implements DateAdapter {
  constructor(
    @Inject(DateAdapterToken)
    private dateAdapter: InjectionTokenType<typeof DateAdapterToken>,
  ) {}

  add = this.dateAdapter.add;
  sub = this.dateAdapter.sub;

  parse(date: string): Date {
    return this.dateAdapter.parse(date);
  }
}
