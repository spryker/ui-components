import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, skip } from 'rxjs';
import { DatasourceDependableElement, DatasourceDependableElementsConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceDependableElementsService {
    elements$ = new BehaviorSubject<DatasourceDependableElementsConfig>({});

    resolve(id: string): Observable<DatasourceDependableElement> {
        return this.elements$.pipe(
            skip(1),
            map((elements) => elements[id]),
        );
    }

    setElement(element: DatasourceDependableElementsConfig): void {
        this.elements$.next({ ...this.elements$.getValue(), ...element });
    }
}
