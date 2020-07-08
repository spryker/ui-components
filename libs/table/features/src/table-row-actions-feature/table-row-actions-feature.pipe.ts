import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '@spryker/dropdown';
import { ContextService } from '@spryker/utils';

@Pipe({ name: 'filterAvailableActions' })
export class FilterAvailableActions implements PipeTransform {
  constructor(private contextService: ContextService) {}

  transform(
    actions: DropdownItem[],
    data: any,
    availableActionsPath: string,
  ): DropdownItem[] {
    if (!availableActionsPath) {
      return actions;
    }

    const availableActions = this.contextService.interpolateExpression(
      availableActionsPath,
      data,
    );

    if (!Array.isArray(availableActions)) {
      return actions;
    }

    return actions.filter(action => availableActions.includes(action.action));
  }
}
