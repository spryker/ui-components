import { Inject, Injectable } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { DateAdapterToken } from './token';
import { DateOperations } from './types';

@Injectable({
  providedIn: 'root',
})
export class DateService implements DateOperations {
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
