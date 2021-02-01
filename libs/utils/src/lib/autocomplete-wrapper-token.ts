import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface AutocompleteWrapper {
  value$: Observable<unknown>;
  initAutocomplete(nzAutocomplete: unknown): void;
}

export const AutocompleteWrapperToken = new InjectionToken<AutocompleteWrapper>(
  'AutocompleteWrapperToken',
);
