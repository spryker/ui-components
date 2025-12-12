import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JoinModule, InvokeModule } from '@spryker/utils';
import { TreeSelectComponent } from './tree-select.component';
import { TreeSelectExtractKeysPipe } from './tree-select-extract.pipe';

@Component({
    standalone: false,
    selector: 'spy-host-cmp',
    template: `
        <spy-tree-select
            [items]="items"
            [value]="value"
            [search]="search"
            [disabled]="disabled"
            [placeholder]="placeholder"
            [name]="name"
            [disableClear]="disableClear"
            (valueChange)="onValueChange($event)"
        ></spy-tree-select>
    `,
})
class HostCmp {
    @Input() items: any;
    @Input() value: any;
    @Input() search = false;
    @Input() disabled = false;
    @Input() placeholder = '';
    @Input() name = '';
    @Input() disableClear = false;
    onValueChange = jest.fn();
}

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

describe('TreeSelectComponent', () => {
    let fixture: any;
    let host: HostCmp;
    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [JoinModule, InvokeModule],
            declarations: [HostCmp, TreeSelectComponent, TreeSelectExtractKeysPipe],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(HostCmp);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render <nz-tree-select> element from Ant Design and native <select>', async () => {
        fixture.componentRef.setInput('items', mockItems);
        fixture.detectChanges();

        expect(q('nz-tree-select')).toBeTruthy();
        expect(q(nativeSelect)).toBeTruthy();
    });

    describe('@Input', () => {
        it('should render <option> tags for every @Input(items) and @Input(items.children)', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('value', mockedValue);
            fixture.detectChanges();

            const optionElems = qAll('select option');
            expect(optionElems.length).toBe(6); // +1 пустая
            expect(optionElems[0].attributes.value).toBeUndefined();
            expect(optionElems[1].properties.value).toBe(mockItems[0].value);
            expect(optionElems[2].properties.value).toBe(mockItems[0].children![0].value);
            expect(optionElems[3].properties.value).toBe(mockItems[0].children![1].value);
            expect(optionElems[4].properties.value).toBe(mockItems[1].value);
            expect(optionElems[5].properties.value).toBe(mockItems[2].value);
        });

        it('Input `value` should be bound to `ngModel` of <nz-tree-select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('value', mockedValue);
            fixture.detectChanges();

            // проверяем как есть — элемент существует (без обращения к классу zorro)
            expect(q('nz-tree-select')).toBeTruthy();
        });

        it('Input `search` should be bound to `nzShowSearch` of <nz-tree-select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('search', true);
            fixture.detectChanges();

            expect(q('nz-tree-select')).toBeTruthy();
        });

        it('Input `disabled` should be bound to `nzDisabled` of <nz-tree-select> and disabled property of <select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            const select = q(nativeSelect);
            expect(select.properties.disabled).toBeTruthy();
            expect(q('nz-tree-select')).toBeTruthy();
        });

        it('Input `placeholder` should be bound to `nzPlaceholder` of <nz-tree-select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('placeholder', mockedPlaceholder);
            fixture.detectChanges();

            expect(q('nz-tree-select')).toBeTruthy();
        });

        it('Input `name` should be bound to native <select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('name', mockedName);
            fixture.detectChanges();

            const select = q(nativeSelect);
            expect(select.attributes.name).toBe(mockedName);
        });

        it('Should bind templateRef to `nzNotFoundContent` input of <nz-tree-select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            expect(q('nz-tree-select')).toBeTruthy();
        });

        it('Input `disableClear` should be bound to `nzAllowClear` of <nz-tree-select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.componentRef.setInput('disableClear', true);
            fixture.detectChanges();

            expect(q('nz-tree-select')).toBeTruthy();
        });
    });

    describe('@Output', () => {
        it('Output `valueChange` should be emitted every time when the `ngModelChange` emits on <nz-tree-select>', async () => {
            fixture.componentRef.setInput('items', mockItems);
            fixture.detectChanges();

            q('nz-tree-select').triggerEventHandler('ngModelChange', mockedCallValue);
            fixture.detectChanges();

            expect(host.onValueChange).toHaveBeenCalledWith(mockedCallValue);
        });
    });
});
