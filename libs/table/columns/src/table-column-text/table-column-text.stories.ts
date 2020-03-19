import { Component, Input } from '@angular/core';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnTextComponent } from './table-column-text.component';
import { TableColumnTextModule } from './table-column-text.module';

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
  },
  component: TableColumnTextComponent,
  props: {
    config: object('Config', {
      text: '${value}',
    }),
    context: object('Context', {
      value: 'Dynamic text',
    }),
  },
});
