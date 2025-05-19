import { AfterViewInit, Component, importProvidersFrom, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { SelectComponent, SelectModule } from '@spryker/select';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceHttpService } from '@spryker/datasource.http';
import {
    DatasourceTriggerElement,
    DatasourceTriggerModule,
    DatasourceTriggerService,
} from '@spryker/datasource.trigger';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ChangeDatasourceTriggerService } from './change-datasource-trigger.service';
import { provideHttpClient } from '@angular/common/http';

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
const mockResponseData = {
    id: 1,
    title: 'json-server',
    author: 'spryker',
    url: '/data-request',
};

@Component({
    selector: 'spy-test',
    template: `
        <div>Choose an option to fire "change" event</div>
        <br />
        <spy-select #selectComponent [options]="options"></spy-select>
        <br />
        Example Response Data:
        <br />
        <div>{{ datasourceData | async | json }}</div>
    `,
    providers: [
        {
            provide: DatasourceTriggerElement,
            useExisting: TestComponent,
        },
    ],
})
class TestComponent implements DatasourceTriggerElement, OnInit, AfterViewInit {
    @ViewChild('selectComponent', { static: true }) selectComponent: SelectComponent;
    @Input() options: any;
    @Input() datasource: any;

    datasourceData = of('');
    triggerElement$ = new ReplaySubject<any>(1);

    constructor(
        private injector: Injector,
        private datasourceTriggerService: DatasourceTriggerService,
    ) { }

    ngOnInit(): void {
        this.datasourceData = this.datasourceTriggerService.resolve(this.injector, this.datasource) as any;
    }

    ngAfterViewInit(): void {
        this.triggerElement$.next(this.selectComponent.selectRef.nativeElement);
    }

    getTriggerElement(): Observable<HTMLElement> {
        return this.triggerElement$;
    }
}

export default {
    title: 'ChangeDatasourceTriggerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        trigger: DatasourceTriggerService,
                        http: DatasourceHttpService,
                    }),
                ),
                importProvidersFrom(
                    DatasourceTriggerModule.withEvents({
                        change: ChangeDatasourceTriggerService,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [SelectModule, MockHttpModule],
            declarations: [TestComponent],
        }),
    ],
    args: {
        datasource: {
            type: 'trigger',
            event: 'change',
            debounce: 400,
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
        mockHttp: setMockHttp([
            {
                url: '/data-request',
                data: mockResponseData,
            },
        ]),
        options: mockOptions,
    },
    template: `
        <spy-test [options]="options" [datasource]="datasource" [mockHttp]="mockHttp"></spy-test>
    `,
});
