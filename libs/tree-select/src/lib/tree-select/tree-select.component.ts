import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ToBoolean, ToJson } from '@spryker/utils';
import { TreeSelectItem, TreeSelectValue } from './types';

@Component({
  selector: 'spy-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TreeSelectComponent implements OnInit {
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

  ngOnInit() {
    this.updateItems();
  }

  private updateItems(): void {
    this.mappedItems = this.items?.map(item => this.mapTreeItems(item));
  }

  private mapTreeItems(item: TreeSelectItem): TreeSelectItem {
    return {
      ...item,
      key: item.value,
      children:
        Array.isArray(item.children) && item.children.length
          ? item.children.map(childItem => this.mapTreeItems(childItem))
          : [],
    } as TreeSelectItem;
  }

  checkSelectedState(value: TreeSelectValue): boolean {
    if (this.mappedValue && Array.isArray(this.mappedValue)) {
      return this.mappedValue.includes(value);
    }

    return value === this.mappedValue;
  }

  handleValueChange(value: TreeSelectValue | TreeSelectValue[]): void {
    this.mappedValue = value;
    this.valueChange.emit(value);
  }
}
