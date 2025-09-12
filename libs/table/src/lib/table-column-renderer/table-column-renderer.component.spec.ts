import {
    AfterViewInit,
    Component,
    inject,
    Injectable,
    Input,
    NO_ERRORS_SCHEMA,
    QueryList,
    TemplateRef,
    ViewChildren,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContextModule, ContextService, DefaultContextSerializationModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { LayoutFlatHostComponent, LayoutFlatHostModule } from '@orchestrator/layout';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';
import {
    ColTplDirective,
    TableColumn,
    TableColumnComponent,
    TableColumnContext,
    TableColumnTplContext,
    TableDataRow,
} from '../table';
import { TableColumnRendererComponent } from './table-column-renderer.component';

const mockConfig: TableColumn = {
    id: 'name',
    title: 'test',
    sortable: true,
    width: '40%',
};
const mockData: TableDataRow = {
    name: 'test',
};

@Component({
    standalone: false,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-host-wrapper',
    template: `
        <spy-table-column-renderer [config]="config" [data]="data" [template]="template"></spy-table-column-renderer>
        <ng-template [spyColTpl]="config.id" let-name>Name is: {{ name }}</ng-template>
    `,
})
class TestHostComponent implements AfterViewInit {
    @ViewChildren(ColTplDirective) slotTemplates?: QueryList<ColTplDirective>;
    @Input() config: any;
    @Input() data: any;
    @Input() template: any;

    templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};

    ngAfterViewInit() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.templatesObj = this.slotTemplates!.reduce(
            (templates, slot) => ({
                ...templates,
                [slot.spyColTpl]: slot.template,
            }),
            {},
        );
    }
}

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
    @ColumnTypeOption()
    text = inject(ContextService).wrap('displayValue');
}

@Component({
    standalone: false,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'table-column-test',
    template: ` {{ config.text | context: context }} `,
})
@TableColumnTypeComponent(TableColumnTestConfig)
class TableColumnTestComponent implements TableColumnComponent<TableColumnTestConfig> {
    @Input() items?: any;
    @Input() config?: TableColumnTestConfig;
    @Input() context?: TableColumnContext;
}

describe('TableColumnRendererComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TestHostComponent, {
        ngModule: {
            imports: [OrchestratorCoreModule, LayoutFlatHostModule, ContextModule, DefaultContextSerializationModule],
            declarations: [TableColumnRendererComponent, ColTplDirective, TableColumnTestComponent, TestHostComponent],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                ...(OrchestratorCoreModule.forRoot().providers || []),
                ...OrchestratorCoreModule.registerComponents({
                    test: TableColumnTestComponent,
                    'layout-flat': LayoutFlatHostComponent,
                }),
                ...(LayoutFlatHostModule.forRoot().providers || []),
            ],
            teardown: { destroyAfterEach: false },
        });
    });

    it('must render `data[config.id]` when input `config.type` and template are undefined', async () => {
        const host = await createComponentWrapper(createComponent, { config: mockConfig, data: mockData });
        const rendererElem = host.queryCss('spy-table-column-renderer');

        expect(rendererElem.nativeElement.textContent).toMatch(mockData[mockConfig.id] as string);
    });

    it('must render `template` when input `template` is set', async () => {
        const host = await createComponentWrapper(createComponent, { config: mockConfig, data: mockData });
        const templateRef = host.component.templatesObj;

        host.setInputs({ template: templateRef[mockConfig.id] }, true);

        const rendererElem = host.queryCss('spy-table-column-renderer');

        expect(rendererElem.nativeElement.textContent).toMatch('Name is: test');
    });

    it('must render `orc-orchestrator` when input `config` has key `type`', async () => {
        const config = {
            ...mockConfig,
            type: 'test',
            typeOptions: { text: '${value} orc-orchestrator' },
        };
        const host = await createComponentWrapper(createComponent, { config: config, data: mockData });
        const rendererElem = host.queryCss('spy-table-column-renderer');

        expect(rendererElem.nativeElement.textContent).toMatch('test orc-orchestrator');
    });
});
