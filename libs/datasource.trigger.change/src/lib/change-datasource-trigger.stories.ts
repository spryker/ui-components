import { Meta } from '@storybook/angular';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { InputModule } from '@spryker/input';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceHttpService } from '@spryker/datasource.http';
import {
    DatasourceTriggerElement,
    DatasourceTriggerModule,
    DatasourceTriggerService,
} from '@spryker/datasource.trigger';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ChangeDatasourceTriggerService } from './change-datasource-trigger.service';

const mockResponseData = {
    id: 1,
    title: 'json-server',
    author: 'spryker',
    url: '/data-request',
};

export default {
    title: 'ChangeDatasourceTriggerService',
    args: {
        datasource: {
            type: 'trigger',
            event: 'change',
            datasource: {
                type: 'http',
                url: '/data-request',
            },
        },
    },
} as Meta;

@Component({
    selector: 'spy-test',
    template: `
        <label>Start typing and click outside to fire "change" event</label>
        <spy-input [placeholder]="placeholder" class="test-input"></spy-input>
        <br />
        Example Response Data:
        <br />
        <div>{{ datasourceData | async | json }}</div>
    `,
})
class TestComponent implements DatasourceTriggerElement, OnInit {
    @Input() placeholder = '';
    @Input() datasource: any;

    datasourceData = of('');
    triggerElement$ = new ReplaySubject<any>(1);

    constructor(private injector: Injector, private datasourceTriggerService: DatasourceTriggerService) {}

    ngOnInit(): void {
        this.datasourceData = this.datasourceTriggerService.resolve(this.injector, this.datasource) as any;
    }

    getTriggerElement(): Observable<HTMLElement> {
        this.triggerElement$.next(document.querySelector('.test-input'));

        return this.triggerElement$;
    }
}

export const primary = (args: any) => ({
    props: {
        ...args,
        placeholder: 'Start typing...',
        mockHttp: setMockHttp([
            {
                url: '/data-request',
                data: mockResponseData,
            },
        ]),
    },
    moduleMetadata: {
        imports: [
            InputModule,
            HttpClientTestingModule,
            MockHttpModule,
            DatasourceModule.withDatasources({
                trigger: DatasourceTriggerService,
                http: DatasourceHttpService,
            }),
            DatasourceTriggerModule.withEvents({
                change: ChangeDatasourceTriggerService,
            }),
        ],
        declarations: [TestComponent],
        providers: [
            TestComponent,
            {
                provide: DatasourceTriggerElement,
                useExisting: TestComponent,
            },
        ],
    },
    template: `
        <spy-test [placeholder]="placeholder" [datasource]="datasource" [mockHttp]="mockHttp"></spy-test>
    `,
});
