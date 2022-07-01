import { Component, Injector, Input } from '@angular/core';
import { Meta } from '@storybook/angular';
import { of } from 'rxjs';
import { DatasourceModule, DatasourceService } from '@spryker/datasource';
import { DatasourceInlineService } from './datasource-inline.service';

export default {
    title: 'DatasourceInline',
    args: {
        datasourceDataProp: 'new data',
    },
} as Meta;

@Component({
    selector: 'spy-test',
    template: `
        {{ datasourceData | async }}
        <br />
        <br />
        <button (click)="getData()">Get Data From Datasource</button>
    `,
})
class TestComponent {
    @Input() datasourceDataProp = '';

    datasourceData = of('initial data');

    constructor(private injector: Injector, private datasourceService: DatasourceService) {}

    getData(): void {
        this.datasourceData = this.datasourceService.resolve(this.injector, {
            type: 'inline',
            data: this.datasourceDataProp,
        } as any);
    }
}

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [
            DatasourceModule.withDatasources({
                inline: DatasourceInlineService,
            } as any),
        ],
        declarations: [TestComponent],
    },
    template: `
    <spy-test [datasourceDataProp]="datasourceDataProp"></spy-test>
  `,
});
