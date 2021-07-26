import { Pipe, PipeTransform } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/tree';

/**
 * Extracts key value from each object that comes from the select list
 */
@Pipe({
  name: 'treeSelectExtractKeys',
})
export class TreeSelectExtractKeysPipe implements PipeTransform {
  transform(value?: NzTreeNode[]): string[] {
    return value
      ? value.map((nodeVal: NzTreeNode) => nodeVal.origin.title)
      : [];
  }
}
