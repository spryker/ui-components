import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '@spryker/dropdown';

@Pipe({ name: 'FilterAvailableActions' })
export class FilterAvailableActions implements PipeTransform {
  transform(actions: DropdownItem[], data: any): DropdownItem[] {
    if (!data.availableActions) {
      return actions;
    }

    const filteredActions = actions.filter(action => {
      return data.availableActions.includes(action.action);
    });

    return filteredActions;
  }
}
