import { Component, importProvidersFrom, Injector, Input } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { DatasourceModule, DatasourceService } from '@spryker/datasource';
import { DatasourceInlineService } from './datasource-inline.service';

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

export default {
    title: 'DatasourceInline',
    decorators: [
        applicationConfig({
            providers: [
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        inline: DatasourceInlineService,
                    } as any),
                ),
            ],
        }),
        moduleMetadata({
            declarations: [TestComponent],
        }),
    ],
    args: {
        datasourceDataProp: 'new data',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-test [datasourceDataProp]="datasourceDataProp"></spy-test>
  `,
});
