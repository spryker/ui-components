import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { DatasourceDependableElement, DatasourceDependableElementsConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceDependableElementsService {
    elements$ = new BehaviorSubject<DatasourceDependableElementsConfig>({});

    resolve(id: string): Observable<DatasourceDependableElement> {
        return this.elements$.pipe(
            filter((elements) => Boolean(elements[id])),
            map((elements) => elements[id]),
        );
    }

    setElement(element: DatasourceDependableElementsConfig): void {
        this.elements$.next({ ...this.elements$.getValue(), ...element });
    }
}
