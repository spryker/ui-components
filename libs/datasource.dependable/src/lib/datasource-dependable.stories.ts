import { Meta } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { SelectModule } from '@spryker/select';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceHttpService } from '@spryker/datasource.http';
import { DatasourceTriggerModule, DatasourceTriggerService } from '@spryker/datasource.trigger';
import { InputDatasourceTriggerService } from '@spryker/datasource.trigger.input';
import { DatasourceDependableModule } from './datasource-dependable.module';
import { DatasourceDependableService } from './datasource-dependable.service';

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
const mockOptionsDependable = [
    {
        title: 'title4',
        value: 'value4',
    },
    {
        title: 'title5',
        value: 'value5',
    },
];

export default {
    title: 'DatasourceDependableService',
    args: {
        datasource: {
            type: 'trigger',
            event: 'input',
            datasource: {
                type: 'http',
                url: '/data-request',
            },
        },
        datasourceDependable: {
            type: 'dependable-element',
            id: 'dependable-select',
            datasource: {
                type: 'http',
                url: '/dependable-data-request',
            },
        },
    },
} as Meta;

export const primary = (args: any) => ({
    props: {
        ...args,
        search: true,
        serverSearch: true,
        disabledWhenNoOptions: true,
        noOptionsText: 'No results found',
        placeholder: 'Start typing to search...',
        mockHttp: setMockHttp([
            {
                url: '/data-request',
                data: mockOptions,
            },
            {
                url: '/dependable-data-request',
                data: mockOptionsDependable,
            },
        ]),
    },
    moduleMetadata: {
        imports: [
            BrowserAnimationsModule,
            SelectModule,
            HttpClientTestingModule,
            MockHttpModule,
            DatasourceDependableModule,
            DatasourceModule.withDatasources({
                'dependable-element': DatasourceDependableService,
                trigger: DatasourceTriggerService,
                http: DatasourceHttpService,
            }),
            DatasourceTriggerModule.withEvents({
                input: InputDatasourceTriggerService,
            }),
        ],
    },
    template: `
        <spy-datasource-dependable id="dependable-select">
            <spy-select
                [search]="search"
                [serverSearch]="serverSearch"
                [noOptionsText]="noOptionsText"
                [placeholder]="placeholder"
                [datasource]="datasource"
                [mockHttp]="mockHttp"
            >
            </spy-select>
        </spy-datasource-dependable>

        <br />
        <br />

        <spy-select
            [disabledWhenNoOptions]="disabledWhenNoOptions"
            [noOptionsText]="noOptionsText"
            [datasource]="datasourceDependable"
            [mockHttp]="mockHttp"
        >
        </spy-select>
    `,
});