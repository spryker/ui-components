import { Injectable, inject } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { DateAdapterToken } from './token';
import { DateAdapter } from './types';

@Injectable({
    providedIn: 'root',
})
export class DateService implements DateAdapter {
    private dateAdapter = inject(DateAdapterToken);

    add = this.dateAdapter.add;
    sub = this.dateAdapter.sub;

    parse(date: string): Date {
        return this.dateAdapter.parse(date);
    }
}
