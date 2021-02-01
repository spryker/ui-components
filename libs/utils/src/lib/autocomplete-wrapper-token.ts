import { InjectionToken } from '@angular/core';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { ReplaySubject } from 'rxjs';

export interface AutocompleteWrapper {
  value$: ReplaySubject<any>;
  initAutocomplete(nzAutocomplete: NzAutocompleteComponent): void;
}

export const AutocompleteWrapperToken = new InjectionToken<AutocompleteWrapper>(
  'AutocompleteWrapperToken',
);
