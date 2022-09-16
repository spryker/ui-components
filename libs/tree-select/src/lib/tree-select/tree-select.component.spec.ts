import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DatasourceModule } from '@spryker/datasource';
import { JoinModule, InvokeModule } from '@spryker/utils';
import { NzTreeSelectModule, NzTreeSelectComponent } from 'ng-zorro-antd/tree-select';
import { createComponentWrapper } from '@spryker/internal-utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TreeSelectComponent } from './tree-select.component';
import { TreeSelectExtractKeysPipe } from './tree-select-extract.pipe';

const nzTreeSelect = 'nz-tree-select';
const nativeSelect = 'select';
const mockedValue = 'mockedValue';
const mockedPlaceholder = 'mockedPlaceholder';
const mockedName = 'mockedName';
const mockedCallValue = ['Option'];
const mockItems = [
    {
        title: 'Option 1',
        value: 'Option 1',
        children: [
            { title: 'Option 7', value: 'Option 7' },
            { title: 'Option 8', value: 'Option 8' },
        ],
    },
    { title: 'Option 2', value: 'Option 2' },
    { title: 'Option 3', value: 'Option 3' },
];

class MockDatasource {
    resolve = jest.fn();
}

describe('TreeSelectComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(TreeSelectComponent, {
        ngModule: {
            imports: [
                NzTreeSelectModule,
                JoinModule,
                InvokeModule,
                DatasourceModule.withDatasources({
                    inline: MockDatasource,
                }),
            ],
            declarations: [TreeSelectExtractKeysPipe],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <nz-tree-select> element from Ant Design and native <select>', async () => {
        const host = await createComponentWrapper(createComponent, { items: mockItems });
        const treeSelect = host.queryCss(nzTreeSelect);
        const select = host.queryCss(nativeSelect);

        expect(treeSelect).toBeTruthy();
        expect(select).toBeTruthy();
    });

    describe('@Input', () => {
        it('should render <option> tags for every @Input(items) and @Input(items.children)', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems, value: mockedValue });
            const optionElems = host.fixture.debugElement.queryAll(By.css('select option'));

            expect(optionElems.length).toBe(6); // +1 for empty option
            expect(optionElems[0].attributes.value).toBe(undefined);
            expect(optionElems[1].properties.value).toBe(mockItems[0].value);
            expect(optionElems[2].properties.value).toBe(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                mockItems[0].children![0].value,
            );
            expect(optionElems[3].properties.value).toBe(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                mockItems[0].children![1].value,
            );
            expect(optionElems[4].properties.value).toBe(mockItems[1].value);
            expect(optionElems[5].properties.value).toBe(mockItems[2].value);
        });

        it('Input `value` should be bound to `ngModel` of <nz-tree-select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems, value: mockedValue });
            const treeSelect = host.queryCss(nzTreeSelect);

            expect(treeSelect.properties.ngModel).toBe(mockedValue);
        });

        it('Input `search` should be bound to `nzShowSearch` of <nz-tree-select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems, search: true });
            const treeSelect = host.queryComponent(NzTreeSelectComponent);

            expect(treeSelect.nzShowSearch).toBeTruthy();
        });

        it('Input `disabled` should be bound to `nzDisabled` of <nz-tree-select> and disabled property of <select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems, disabled: true });
            const treeSelect = host.queryComponent(NzTreeSelectComponent);
            const select = host.queryCss(nativeSelect);

            expect(treeSelect.nzDisabled).toBeTruthy();
            expect(select.properties.disabled).toBeTruthy();
        });

        it('Input `placeholder` should be bound to `nzPlaceholder` of <nz-tree-select>', async () => {
            const host = await createComponentWrapper(createComponent, {
                items: mockItems,
                placeholder: mockedPlaceholder,
            });
            const treeSelect = host.queryComponent(NzTreeSelectComponent);

            expect(treeSelect.nzPlaceHolder).toBe(mockedPlaceholder);
        });

        it('Input `name` should be bound to native <select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems, name: mockedName });
            const select = host.queryCss(nativeSelect);

            expect(select.attributes.name).toBe(mockedName);
        });

        it('Should bind templateRef to `nzNotFoundContent` input of <nz-tree-select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems });
            const treeSelect = host.queryComponent(NzTreeSelectComponent);

            expect(treeSelect.nzNotFoundContent).toEqual(expect.any(TemplateRef));
        });

        it('Input `disableClear` should be bound to `nzAllowClear` of <nz-tree-select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems, disableClear: true });
            const treeSelect = host.queryComponent(NzTreeSelectComponent);

            expect(treeSelect.nzAllowClear).toBeFalsy();
        });
    });

    describe('@Output', () => {
        it('Output `valueChange` should be emitted every time when the `ngModelChange` emits on <nz-tree-select>', async () => {
            const host = await createComponentWrapper(createComponent, { items: mockItems });
            const treeSelect = host.queryCss(nzTreeSelect);

            treeSelect.triggerEventHandler('ngModelChange', mockedCallValue);
            host.detectChanges();

            expect(host.hostComponent.valueChange).toHaveBeenCalledWith(mockedCallValue);
        });
    });
});
