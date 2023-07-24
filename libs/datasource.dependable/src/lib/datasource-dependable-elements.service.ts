import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { DatasourceDependableElement, DatasourceDependableElementsConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceDependableElementsService {
    elements$ = new ReplaySubject<DatasourceDependableElementsConfig>(1);

    resolve(id: string): Observable<DatasourceDependableElement> {
        return this.elements$.pipe(map((elements) => elements[id]));
    }

    getElements(elements: DatasourceDependableElementsConfig): void {
        this.elements$.next(elements);
    }
}
