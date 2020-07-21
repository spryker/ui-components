import { Pipe, PipeTransform } from '@angular/core';

/**
 * Extracts key value from each object that comes from the select list
 */
@Pipe({
  name: 'treeSelectExtract',
})
export class TreeSelectExtractPipe implements PipeTransform {
  transform(value?: []): string[] {
    return value ? value.map((nodeVal: { key: string }) => nodeVal.key) : [];
  }
}
