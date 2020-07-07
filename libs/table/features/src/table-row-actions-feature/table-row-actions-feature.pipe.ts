import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '@spryker/dropdown';

@Pipe({ name: 'filterAvailableActions' })
export class FilterAvailableActions implements PipeTransform {
  transform(actions: DropdownItem[], data: any): DropdownItem[] {
    if (!data.availableActions) {
      return actions;
    }

    return actions.filter(action =>
      data.availableActions.includes(action.action),
    );
  }
}
