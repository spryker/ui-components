import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { I18nService } from '@spryker/locale';
import { ToBoolean, ToJson } from '@spryker/utils';
import { NzTreeSelectComponent } from 'ng-zorro-antd/tree-select';
import { BehaviorSubject, EMPTY, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchAll, switchMap, takeUntil } from 'rxjs/operators';
import { TreeSelectItem, TreeSelectValue } from './types';

/**
 * Interface extends {@link TreeSelectItem} and adds 'key' property as it is required by ant-design
 */
interface TreeSelectItemWithKey extends TreeSelectItem {
    key: string;
    isLeaf: boolean;
    disabled?: boolean;
    children?: TreeSelectItemWithKey[];
}

/**
 * {@link TreeSelectComponent} represents select component with the opportunity to use the hierarchy structure of selecting
 */
@Component({
    standalone: false,
    selector: 'spy-tree-select',
    templateUrl: './tree-select.component.html',
    styleUrls: ['./tree-select.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-tree-select',
    },
})
export class TreeSelectComponent implements OnChanges, OnInit, OnDestroy, AfterViewChecked {
    @Input() @ToJson() items?: TreeSelectItem[];
    @Input() @ToJson() value?: TreeSelectValue | TreeSelectValue[];
    @Input() @ToBoolean() search = false;
    @Input() @ToBoolean() disabled = false;
    @Input() @ToBoolean() multiple = false;
    @Input() placeholder = '';
    @Input() name = '';
    @Input() noOptionsText = '';
    @Input() @ToBoolean() disableClear = false;
    @Input() @ToJson() datasource?: DatasourceConfig;
    @Input() context?: unknown;

    @Output() valueChange = new EventEmitter<TreeSelectValue | TreeSelectValue[]>();

    mappedItems?: TreeSelectItemWithKey[];
    mappedFlatItems?: TreeSelectItem[];

    datasourceOptions$ = new ReplaySubject<Observable<TreeSelectItem[]>>();

    private destroyed$ = new Subject<void>();

    setNoOptionsText$ = new BehaviorSubject(this.noOptionsText);
    noOptionsText$ = this.setNoOptionsText$.pipe(
        switchMap((noOptionsText) =>
            noOptionsText ? of(noOptionsText) : this.i18nService.translate('tree-select.no-results'),
        ),
    );

    @ViewChild('treeSelect', { static: true })
    protected treeSelect: NzTreeSelectComponent;
    protected checkedState: TreeSelectValue | TreeSelectValue[];
    private viewUpdated = false;

    constructor(
        private cdr: ChangeDetectorRef,
        private injector: Injector,
        private datasourceService: DatasourceService,
        private i18nService: I18nService,
    ) {}

    ngOnInit(): void {
        this.updateDatasource();

        this.datasourceOptions$.pipe(switchAll(), takeUntil(this.destroyed$)).subscribe((items) => {
            this.items = items;
            this.updateItems();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.items) {
            this.updateItems();
        }

        if (changes.datasource && !changes.datasource.firstChange) {
            this.updateDatasource();
        }

        if (changes.noOptionsText) {
            this.setNoOptionsText$.next(this.noOptionsText);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    ngAfterViewChecked(): void {
        const hasValue = (Array.isArray(this.value) && this.value.length) || this.value;

        if (hasValue && !this.viewUpdated) {
            this.updateCheckedState();
        }
    }

    private updateDatasource() {
        // Reset items before invoking datasource
        if (this.datasource) {
            this.items = undefined;
            this.updateItems();
        }

        const items$ = this.datasource
            ? this.datasourceService?.resolve(this.injector, this.datasource, this.context)
            : EMPTY;

        this.datasourceOptions$.next(items$ as Observable<TreeSelectItem[]>);
    }

    private updateItems(): void {
        this.mappedItems = this.items?.map((item) => this.mapTreeItems(item));
        this.mappedFlatItems = this.items?.reduce(
            (selectItems: TreeSelectItem[], item) => [...selectItems, ...this.mapFlatTreeItems(item)],
            [],
        );
        this.updateCheckedState();
    }

    private mapFlatTreeItems(item: TreeSelectItem): TreeSelectItem[] {
        const childItems =
            item.children?.reduce(
                (selectItems: TreeSelectItem[], childItem) => [...selectItems, ...this.mapFlatTreeItems(childItem)],
                [],
            ) ?? [];

        return [
            {
                value: item.value,
                title: item.title,
                isDisabled: item.isDisabled ?? false,
            },
            ...childItems,
        ];
    }

    private mapTreeItems(item: TreeSelectItem): TreeSelectItemWithKey {
        const isChildrenExist = Array.isArray(item.children) && item.children.length;

        return {
            ...item,
            key: String(item.value),
            disabled: item.isDisabled,
            children: isChildrenExist ? item.children?.map((childItem) => this.mapTreeItems(childItem)) : [],
            isLeaf: !isChildrenExist,
        };
    }

    /**
     * @param value {@link TreeSelectValue}
     * Check if item value equal to the selected value or includes in selected values array if mode is multiple
     * @param multiple
     * @param state
     */
    checkSelectedState(value: TreeSelectValue, multiple: boolean, state: TreeSelectValue | TreeSelectValue[]): boolean {
        if (multiple && state && Array.isArray(state)) {
            return state.includes(value);
        }

        return value === state;
    }

    protected onValueChange(): void {
        this.updateCheckedState();
        this.valueChange.emit(this.checkedState);
    }

    protected updateCheckedState = (): void => {
        if (!this.multiple) {
            this.checkedState = this.value;
            this.viewUpdated = true;

            return;
        }

        const nodes = this.treeSelect.getCheckedNodeList().map((node) => node.origin);
        const result = [];

        if (!nodes.length && !this.viewUpdated) {
            return;
        }

        for (const node of nodes) {
            if (node.children) {
                nodes.push(...node.children);
            }

            result.push(node.value);
        }

        this.checkedState ??= [];
        this.checkedState = [...result];

        if (!this.viewUpdated) {
            this.viewUpdated = true;
            this.cdr.detectChanges();
        }
    };
}
