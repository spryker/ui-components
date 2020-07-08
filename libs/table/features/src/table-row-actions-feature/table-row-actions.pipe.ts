import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '@spryker/dropdown';

/**
 * Filter list of items by list of allowed actions
 */
@Pipe({ name: 'filterAvailableActions' })
export class FilterAvailableActionsPipe implements PipeTransform {
  transform(actions: DropdownItem[], data: any): DropdownItem[] {
    if (!data.availableActions) {
      return actions;
    }

    return actions.filter(action =>
      data.availableActions.includes(action.action),
    );
  }
}
