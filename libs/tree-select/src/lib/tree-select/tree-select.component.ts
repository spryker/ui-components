import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';
import { TreeSelectItem, TreeSelectValue } from './types';

/**
 * Interface extends {@link TreeSelectItem} and adds 'key' property as it is required by ant-design
 */
interface TreeSelectItemWithKey extends TreeSelectItem {
  key: TreeSelectValue;
  isLeaf: boolean;
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
})
export class TreeSelectComponent implements OnChanges {
  @Input() @ToJson() items?: TreeSelectItem[];
  @Input() @ToJson() value?: TreeSelectValue | TreeSelectValue[];
  @Input() @ToBoolean() search = false;
  @Input() @ToBoolean() disabled = false;
  @Input() @ToBoolean() multiple = false;
  @Input() placeholder = '';
  @Input() name = '';
  @Input() noOptionsText = '';
  @Input() @ToBoolean() disableClear = false;

  @Output() valueChange = new EventEmitter<
    TreeSelectValue | TreeSelectValue[]
  >();

  mappedItems?: TreeSelectItem[];
  mappedValue?: TreeSelectValue | TreeSelectValue[];

  ngOnChanges(changes: SimpleChanges): void {
    if ('items' in changes) {
      this.updateItems();
    }
  }

  private updateItems(): void {
    this.mappedItems = this.items?.map(item => this.mapTreeItems(item));
  }

  private mapTreeItems(item: TreeSelectItem): TreeSelectItemWithKey {
    const isChildrenExist = Array.isArray(item.children);

    return {
      ...item,
      key: item.value,
      children: isChildrenExist
        ? item.children?.map(childItem => this.mapTreeItems(childItem))
        : [],
      isLeaf: !isChildrenExist,
    };
  }

  /**
   * @param value {@link TreeSelectValue}
   * Check if item value equal to the selected value or includes in selected values array if mode is multiple
   */
  checkSelectedState(value: TreeSelectValue): boolean {
    if (this.multiple && this.mappedValue && Array.isArray(this.mappedValue)) {
      return this.mappedValue.includes(value);
    }

    return value === this.mappedValue;
  }

  /**
   * @param value {@link TreeSelectValue}
   * Emits valueChange output
   */
  handleValueChange(value: TreeSelectValue | TreeSelectValue[]): void {
    this.mappedValue = value;
    this.valueChange.emit(value);
  }
}
