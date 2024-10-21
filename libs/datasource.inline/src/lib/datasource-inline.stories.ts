import { Component, importProvidersFrom, Injector, Input } from '@angular/core';
import { DatasourceModule, DatasourceService } from '@spryker/datasource';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { DatasourceInlineService } from './datasource-inline.service';

const context = {
    dependable1: 'data-1',
    dependable2: 'data-2',
    dependable3: 'data-3',
}

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
    @Input() dependable = false;
    @Input() contextKey = '';

    datasourceData = of('initial data');

    constructor(
        private injector: Injector,
        private datasourceService: DatasourceService,
    ) { }

    getData(): void {
        this.datasourceData = this.datasourceService.resolve(this.injector, {
            type: 'inline',
            data: !this.dependable ? this.datasourceDataProp : {
                'data-1': 'data depends on context 1',
                'data-2': 'data depends on context 2',
                'data-3': 'data depends on context 3',
            },
            ...(this.dependable ? {
                dependsOnContext: {
                    contextKey: this.contextKey,
                    default: 'default data',
                }
            } : {})
        }, this.dependable ? context : undefined);
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
    parameters: {
        controls: {
            include: ['contextKey', 'datasourceDataProp'],
        },
    },
    args: {
        datasourceDataProp: '',
        contextKey: '',
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
        <spy-test [datasourceDataProp]="datasourceDataProp"></spy-test>
    `,
});

export const dependable = (args) => ({
    props: {
        ...args,
        context: context,
    },
    template: `
        use contextKey to set the context key depends on context
        <br />
        context: {{ context | json }}
        <br />
        <br />
        <br />
        <br />
        <br />
        <spy-test [dependable]="true" [contextKey]="contextKey"></spy-test>
    `,
});
