import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { AutocompleteWrapperToken, ToJson } from '@spryker/utils';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { EMPTY, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, switchAll, switchMap, takeUntil } from 'rxjs/operators';

import { AutocompleteValue } from './types';

@Component({
    standalone: false,
    selector: 'spy-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnChanges, OnInit, OnDestroy {
    private injector = inject(Injector);
    private datasourceService = inject(DatasourceService);
    private autocompleteWrapper = inject(AutocompleteWrapperToken);

    @Input() @ToJson() options?: AutocompleteValue[];
    @Input() @ToJson() datasource?: DatasourceConfig;
    @Input() context?: unknown;

    @ViewChild(NzAutocompleteComponent, { static: true })
    nzAutocompleteComponent?: NzAutocompleteComponent;

    datasourceOptions$ = new ReplaySubject<Observable<AutocompleteValue[]>>(1);
    options$ = new ReplaySubject<AutocompleteValue[] | undefined>(1);
    filteredOptions$ = this.options$.pipe(
        switchMap((options) => {
            if (!this.autocompleteWrapper?.value$ || !options) {
                return of(options ?? []);
            }

            return this.autocompleteWrapper?.value$.pipe(
                map((value) =>
                    options?.filter((option) => option.title.toLowerCase().includes(String(value).toLowerCase())),
                ),
            );
        }),
    );

    private destroyed$ = new Subject<void>();

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

        this.datasourceOptions$.pipe(switchAll(), takeUntil(this.destroyed$)).subscribe((options) => {
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
            ? this.datasourceService.resolve(this.injector, this.datasource, this.context)
            : EMPTY;

        this.datasourceOptions$.next(options$ as Observable<AutocompleteValue[]>);
    }
}
