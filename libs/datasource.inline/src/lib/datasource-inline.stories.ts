import { Component, Injector, Input } from '@angular/core';
import { DatasourceModule, DatasourceService } from '@spryker/datasource';
import { text } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { of } from 'rxjs';

import { DatasourceInlineService } from './datasource-inline.service';

export default {
  title: 'DatasourceInline',
};

@Component({
  selector: 'spy-test',
  template: `
    {{ datasourceData | async }}
    <br />
    <br />
    <br />
    <br />
    <br />
    <button (click)="getData()">Get Data From Datasource</button>
  `,
})
class TestComponent {
  @Input() datasourceDataProp = '';

  datasourceData = of('initial data');

  constructor(
    private injector: Injector,
    private datasourceService: DatasourceService,
  ) {}

  getData(): void {
    this.datasourceData = this.datasourceService.resolve(this.injector, {
      type: 'inline',
      data: this.datasourceDataProp,
    });
  }
}

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      DatasourceModule.withDatasources({
        inline: DatasourceInlineService,
      }),
    ],
    declarations: [TestComponent],
  },
  template: `
    <spy-test [datasourceDataProp]="datasourceDataProp"></spy-test>
  `,
  props: {
    datasourceDataProp: text('Data For Datasource', ''),
  },
});
