import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { SelectModule } from '@spryker/select';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceHttpService } from '@spryker/datasource.http';
import { DatasourceTriggerModule, DatasourceTriggerService } from '@spryker/datasource.trigger';
import { InputDatasourceTriggerService } from './input-datasource-trigger.service';
import { importProvidersFrom } from '@angular/core';

const mockOptions = [
    {
        title: 'title1',
        value: 'value1',
    },
    {
        title: 'title2',
        value: 'value2',
    },
    {
        title: 'title3',
        value: 'value3',
    },
];

export default {
    title: 'InputDatasourceTriggerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(HttpClientTestingModule),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        trigger: DatasourceTriggerService,
                        http: DatasourceHttpService,
                    }),
                ),
                importProvidersFrom(
                    DatasourceTriggerModule.withEvents({
                        input: InputDatasourceTriggerService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [SelectModule, MockHttpModule],
        }),
    ],
    args: {
        datasource: {
            type: 'trigger',
            event: 'input',
            debounce: 400,
            minCharacters: 2,
            datasource: {
                type: 'http',
                url: '/data-request',
            },
        },
    },
} as Meta;

export const primary = (args: any) => ({
    props: {
        ...args,
        search: true,
        serverSearch: true,
        noOptionsText: 'No results found',
        placeholder: 'Start typing to search...',
        mockHttp: setMockHttp([
            {
                url: '/data-request',
                data: mockOptions,
            },
        ]),
    },
    template: `
        <spy-select
            [search]="search"
            [serverSearch]="serverSearch"
            [noOptionsText]="noOptionsText"
            [placeholder]="placeholder"
            [datasource]="datasource"
            [mockHttp]="mockHttp"
        >
        </spy-select>
    `,
});
