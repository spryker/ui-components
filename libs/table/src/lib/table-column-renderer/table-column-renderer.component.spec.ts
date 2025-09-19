import {
    AfterViewInit,
    Component,
    Injectable,
    Input,
    NO_ERRORS_SCHEMA,
    QueryList,
    TemplateRef,
    ViewChildren,
    inject,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContextModule, ContextService, DefaultContextSerializationModule } from '@spryker/utils';
import { LayoutFlatHostComponent, LayoutFlatHostModule } from '@orchestrator/layout';
import { OrchestratorCoreModule } from '@orchestrator/core';

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

@Injectable({ providedIn: 'root' })
class TableColumnTestConfig {
    @ColumnTypeOption()
    text = inject(ContextService).wrap('displayValue');
}

@Component({
    standalone: false,
    selector: 'table-column-test',
    template: ` {{ config.text | context: context }} `,
})
@TableColumnTypeComponent(TableColumnTestConfig)
class TableColumnTestComponent implements TableColumnComponent<TableColumnTestConfig> {
    @Input() items?: any;
    @Input() config?: TableColumnTestConfig;
    @Input() context?: TableColumnContext;
}

@Component({
    selector: 'test-host-wrapper',
    template: `
        <spy-table-column-renderer [config]="config" [data]="data" [template]="template"></spy-table-column-renderer>

        <ng-template [spyColTpl]="config?.id" let-name> Name is: {{ name }} </ng-template>
    `,
    standalone: false,
})
class TestHostComponent implements AfterViewInit {
    @ViewChildren(ColTplDirective) slotTemplates?: QueryList<ColTplDirective>;

    @Input() config: any;
    @Input() data: any;
    @Input() template?: TemplateRef<TableColumnTplContext>;

    templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};

    ngAfterViewInit(): void {
        this.templatesObj = this.slotTemplates!.reduce(
            (acc, slot) => ({ ...acc, [slot.spyColTpl]: slot.template }),
            {} as Record<string, TemplateRef<TableColumnTplContext>>,
        );
    }
}

describe('TableColumnRendererComponent', () => {
    let fixture: any;

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OrchestratorCoreModule, LayoutFlatHostModule, ContextModule, DefaultContextSerializationModule],
            declarations: [
                TableColumnRendererComponent,
                ColTplDirective,
                TableColumnTestComponent,
                TestHostComponent,
            ],
            providers: [
                ...(OrchestratorCoreModule.forRoot().providers || []),
                ...OrchestratorCoreModule.registerComponents({
                    test: TableColumnTestComponent,
                    'layout-flat': LayoutFlatHostComponent,
                }),
                ...(LayoutFlatHostModule.forRoot().providers || []),
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('must render `data[config.id]` when input `config.type` and template are undefined', () => {
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('data', mockData);
        fixture.detectChanges();

        const rendererDe = q('spy-table-column-renderer');
        expect(rendererDe).toBeTruthy();
        expect(rendererDe.nativeElement.textContent).toMatch(mockData[mockConfig.id] as string);
    });

    it('must render `template` when input `template` is set', () => {
        fixture.detectChanges();
        fixture.componentRef.setInput('config', mockConfig);
        fixture.componentRef.setInput('data', mockData);
        fixture.detectChanges();

        const tpl = fixture.componentInstance.templatesObj[mockConfig.id];
        fixture.componentRef.setInput('template', tpl);
        fixture.detectChanges();

        const rendererDe = q('spy-table-column-renderer');
        expect(rendererDe).toBeTruthy();
        expect(rendererDe.nativeElement.textContent).toContain(mockConfig.title);
    });

    it('must render `orc-orchestrator` when input `config` has key `type`', () => {
        const cfgWithType: TableColumn = {
            ...mockConfig,
            type: 'test' as any,
            typeOptions: { text: '${value} orc-orchestrator' } as any,
        };

        fixture.componentRef.setInput('config', cfgWithType);
        fixture.componentRef.setInput('data', mockData);
        fixture.detectChanges();

        const rendererDe = q('spy-table-column-renderer');
        expect(rendererDe).toBeTruthy();
        expect(rendererDe.nativeElement.textContent).toMatch('test orc-orchestrator');
    });
});
