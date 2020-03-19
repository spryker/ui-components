import { Component, Input } from '@angular/core';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import {
  TableColumnTextConfig,
  TableColumnTextModule,
} from '@spryker/table/columns';
import { TableColumnContext } from '@spryker/table';

export default {
  title: 'TableColumnText',
};

@Component({
  selector: 'render-column-type',
  template: `
    <spy-table-column-text
      [config]="config"
      [context]="context"
    ></spy-table-column-text>
  `,
})
class RenderColumnType {
  @Input() config: TableColumnTextConfig;
  @Input() context: TableColumnContext;
}

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnTextModule],
    declarations: [RenderColumnType],
  },
  template: `
    <render-column-type [config]="config" [context]="context"></render-column-type>
  `,
  props: {
    config: object('Config', {
      text: '${value}',
    }),
    context: object('Context', {
      value: 'Dynamic text',
    }),
  },
});
