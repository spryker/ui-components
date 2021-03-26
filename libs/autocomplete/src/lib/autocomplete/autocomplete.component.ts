import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  Injector,
} from '@angular/core';
import {
  AutocompleteWrapperToken,
  InjectionTokenType,
  ToJson,
} from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { of, ReplaySubject, Observable, Subject, EMPTY } from 'rxjs';
import { map, switchMap, switchAll, takeUntil } from 'rxjs/operators';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';

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
  @Input() datasource?: DatasourceConfig;

  @ViewChild(NzAutocompleteComponent, { static: true })
  nzAutocompleteComponent?: NzAutocompleteComponent;

  datasourceOptions$ = new ReplaySubject<Observable<AutocompleteValue[]>>(1);
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

  private destroyed$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private datasourceService: DatasourceService,
    @Inject(AutocompleteWrapperToken)
    private autocompleteWrapper?: InjectionTokenType<
      typeof AutocompleteWrapperToken
    >,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.updateFilteredOptions();
    }

    if (changes.datasource) {
      this.updateDatasource();
    }
  }

  ngOnInit(): void {
    this.updateFilteredOptions();

    if (this.autocompleteWrapper && this.nzAutocompleteComponent) {
      this.autocompleteWrapper.initAutocomplete(this.nzAutocompleteComponent);
    }

    this.datasourceOptions$
      .pipe(switchAll(), takeUntil(this.destroyed$))
      .subscribe((options) => {
        this.options$.next(options);
      });
  }

  updateFilteredOptions(): void {
    this.options$.next(this.options);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private updateDatasource() {
    // Reset options before invoking datasource
    if (this.datasource) {
      this.options$.next(undefined);
    }

    const options$ = this.datasource
      ? this.datasourceService
          .resolve(this.injector, this.datasource)
          .pipe(map((data) => (data as unknown) as AutocompleteValue[]))
      : EMPTY;

    this.datasourceOptions$.next(options$);
  }
}
