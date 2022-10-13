import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IconMagnifierModule, IconRemoveModule } from '@spryker/icon/icons';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { combineLatest, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, pluck, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { TableSearchConfig } from './types';

@Component({
    selector: 'spy-table-search-feature',
    templateUrl: './table-search-feature.component.html',
    styleUrls: ['./table-search-feature.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: TableFeatureComponent,
            useExisting: TableSearchFeatureComponent,
        },
    ],
})
export class TableSearchFeatureComponent extends TableFeatureComponent<TableSearchConfig> implements OnDestroy, OnInit {
    @Input() isVisibilityEnabled? = false;

    name = 'search';
    tableFeatureLocation = TableFeatureLocation;
    suffixIcon = IconRemoveModule.icon;
    prefixIcon = IconMagnifierModule.icon;

    destroyed$ = new Subject<void>();
    inputValue$ = new Subject<string>();
    valueChange$ = this.inputValue$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroyed$));
    dataConfig$ = this.dataConfiguratorService$.pipe(
        switchMap((service) => service.config$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    placeholder$ = this.config$.pipe(
        pluck('placeholder'),
        map((placeholder) => placeholder ?? ''),
    );
    searchValue$ = this.dataConfig$.pipe(pluck('search'));
    value$ = merge(this.inputValue$, this.searchValue$);
    data$ = this.table$.pipe(
        switchMap((table) => table.data$),
        pluck('data'),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    isVisible$ = combineLatest([
        this.dataConfig$,
        this.data$,
        this.table$.pipe(switchMap((table) => table.isLoading$)),
    ]).pipe(
        map(([config, data, isLoading]) => {
            if (!this.isVisibilityEnabled || !config.isVisibilityEnabled) {
                return true;
            }

            const isFiltered = config?.filter
                ? Boolean(Object.keys(config.filter as Record<string, unknown>).length)
                : false;
            const isSearched = config?.search ? (config.search as string).length : false;
            const isChanged = isFiltered || isSearched;
            const isData = Boolean(data.length);

            return isData || (!isData && (isChanged || isLoading));
        }),
    );

    ngOnInit(): void {
        this.valueChange$.pipe(takeUntil(this.destroyed$)).subscribe((value) => this.triggerUpdate(value));
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    inputValueChange(event: string): void {
        this.inputValue$.next(event);
    }

    triggerUpdate(inputValue: string): void {
        this.dataConfiguratorService?.update({
            search: inputValue || '',
        });
    }

    clearInput(): void {
        this.inputValueChange('');
    }
}
