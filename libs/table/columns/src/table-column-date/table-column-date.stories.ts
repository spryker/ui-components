import { Component, Input } from '@angular/core';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnDateModule } from './table-column-date.module';
import { TableColumnDateConfig } from './table-column-date.component';
import { TableColumnContext } from '@spryker/table';

export default {
  title: 'TableColumnDate',
};

@Component({
  selector: 'render-column-type',
  template: `
    <spy-table-column-date
      [config]="config"
      [context]="context"
    ></spy-table-column-date>
  `,
})
class RenderColumnType {
  @Input() config: TableColumnDateConfig;
  @Input() context: TableColumnContext;
}

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnDateModule],
    declarations: [RenderColumnType],
  },
  template: `
    <render-column-type [config]="config" [context]="context"></render-column-type>
  `,
  props: {
    config: object('Config', {
      date: '${value}',
      format: 'mediumDate',
    }),
    context: object('Context', {
      value: new Date('2020-01-01T17:25:00'),
    }),
  },
});
