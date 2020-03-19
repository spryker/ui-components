import { Component, Input } from '@angular/core';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import {
  TableColumnImageConfig,
  TableColumnImageModule,
} from '@spryker/table/columns';
import { TableColumnContext } from '@spryker/table';

export default {
  title: 'TableColumnImage',
};

@Component({
  selector: 'render-column-type',
  template: `
    <spy-table-column-image
      [config]="config"
      [context]="context"
    ></spy-table-column-image>
  `,
})
class RenderColumnType {
  @Input() config: TableColumnImageConfig;
  @Input() context: TableColumnContext;
}

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnImageModule],
    declarations: [RenderColumnType],
  },
  template: `
    <render-column-type [config]="config" [context]="context"></render-column-type>
  `,
  props: {
    config: object('Config', {
      src: '${value}',
    }),
    context: object('Context', {
      value: 'Dynamic url',
    }),
  },
});
