import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AutocompleteWrapperToken,
  InjectionTokenType,
  ToJson,
} from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { of, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AutocompleteValue } from './types';

@Component({
  selector: 'spy-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() @ToJson() options?: AutocompleteValue[];

  @ViewChild(NzAutocompleteComponent, { static: true })
  nzAutocompleteComponent?: NzAutocompleteComponent;

  options$ = new ReplaySubject<AutocompleteValue[]>(1);
  filteredOptions$ = this.options$.pipe(
    switchMap((options) => {
      if (!this.autocompleteWrapper?.value$ || !options) {
        return of(options ?? []);
      }

      return this.autocompleteWrapper?.value$.pipe(
        map((value) =>
          options?.filter((option) =>
            option.title.toLowerCase().includes(String(value).toLowerCase()),
          ),
        ),
      );
    }),
  );

  constructor(
    @Inject(AutocompleteWrapperToken)
    private autocompleteWrapper?: InjectionTokenType<
      typeof AutocompleteWrapperToken
    >,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.updateFilteredOptions();
    }
  }

  ngOnInit(): void {
    this.updateFilteredOptions();

    if (this.autocompleteWrapper && this.nzAutocompleteComponent) {
      this.autocompleteWrapper.initAutocomplete(this.nzAutocompleteComponent);
    }
  }

  updateFilteredOptions(): void {
    this.options$.next(this.options);
  }
}
