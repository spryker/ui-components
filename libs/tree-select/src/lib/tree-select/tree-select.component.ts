import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { ToBoolean, ToJson } from '@spryker/utils';
import { EMPTY, Observable, ReplaySubject, Subject } from 'rxjs';
import { switchAll, takeUntil } from 'rxjs/operators';
import { TreeSelectItem, TreeSelectValue } from './types';

/**
 * Interface extends {@link TreeSelectItem} and adds 'key' property as it is required by ant-design
 */
interface TreeSelectItemWithKey extends TreeSelectItem {
  key: string;
  isLeaf: boolean;
  children?: TreeSelectItemWithKey[];
}

/**
 * {@link TreeSelectComponent} represents select component with the opportunity to use the hierarchy structure of selecting
 */
@Component({
  selector: 'spy-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-tree-select',
  },
})
export class TreeSelectComponent implements OnChanges, OnInit, OnDestroy {
  @Input() @ToJson() items?: TreeSelectItem[];
  @Input() @ToJson() value?: TreeSelectValue | TreeSelectValue[];
  @Input() @ToBoolean() search = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() multiple = false;
  @Input() placeholder = '';
  @Input() name = '';
  @Input() noOptionsText = '';
  @Input() @ToBoolean() disableClear = false;
  @Input() datasource?: DatasourceConfig;
  @Input() context?: unknown;

  @Output() valueChange = new EventEmitter<
    TreeSelectValue | TreeSelectValue[]
  >();

  mappedItems?: TreeSelectItemWithKey[];
  mappedFlatItems?: TreeSelectItem[];

  datasourceOptions$ = new ReplaySubject<Observable<TreeSelectItem[]>>();

  private destroyed$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private datasourceService: DatasourceService,
  ) {}

  ngOnInit(): void {
    this.updateDatasource();

    this.datasourceOptions$
      .pipe(switchAll(), takeUntil(this.destroyed$))
      .subscribe((items) => {
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
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private updateDatasource() {
    // Reset items before invoking datasource
    if (this.datasource) {
      this.items = undefined;
      this.updateItems();
    }

    const items$ = this.datasource
      ? this.datasourceService?.resolve(
          this.injector,
          this.datasource,
          this.context,
        )
      : EMPTY;

    this.datasourceOptions$.next(items$ as Observable<TreeSelectItem[]>);
  }

  private updateItems(): void {
    this.mappedItems = this.items?.map((item) => this.mapTreeItems(item));
    this.mappedFlatItems = this.items?.reduce(
      (selectItems: TreeSelectItem[], item) => [
        ...selectItems,
        ...this.mapFlatTreeItems(item),
      ],
      [],
    );
  }

  private mapFlatTreeItems(item: TreeSelectItem): TreeSelectItem[] {
    const childItems =
      item.children?.reduce(
        (selectItems: TreeSelectItem[], childItem) => [
          ...selectItems,
          ...this.mapFlatTreeItems(childItem),
        ],
        [],
      ) ?? [];

    return [
      {
        value: item.value,
        title: item.title,
      },
      ...childItems,
    ];
  }

  private mapTreeItems(item: TreeSelectItem): TreeSelectItemWithKey {
    const isChildrenExist =
      Array.isArray(item.children) && item.children.length;

    return {
      ...item,
      key: String(item.value),
      children: isChildrenExist
        ? item.children?.map((childItem) => this.mapTreeItems(childItem))
        : [],
      isLeaf: !isChildrenExist,
    };
  }

  /**
   * @param value {@link TreeSelectValue}
   * Check if item value equal to the selected value or includes in selected values array if mode is multiple
   */
  checkSelectedState(
    value: TreeSelectValue,
    multiple: boolean,
    state: TreeSelectValue | TreeSelectValue[],
  ): boolean {
    if (multiple && state && Array.isArray(state)) {
      return state.includes(value);
    }

    return value === state;
  }
}
