import { Meta } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { SelectModule } from '@spryker/select';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceHttpService } from '@spryker/datasource.http';
import { DatasourceTriggerModule, DatasourceTriggerService } from '@spryker/datasource.trigger';
import { InputDatasourceTriggerService } from './input-datasource-trigger.service';

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
    args: {
        datasource: {
            type: 'trigger',
            event: 'input',
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
    moduleMetadata: {
        imports: [
            BrowserAnimationsModule,
            SelectModule,
            HttpClientTestingModule,
            MockHttpModule,
            DatasourceModule.withDatasources({
                trigger: DatasourceTriggerService,
                http: DatasourceHttpService,
            }),
            DatasourceTriggerModule.withEvents({
                input: InputDatasourceTriggerService,
            }),
        ],
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
