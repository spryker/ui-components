import { Component, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { DatasourceModule } from '@spryker/datasource';
import { IconRemoveModule } from '@spryker/icon/icons';
import { createComponentWrapper } from '@spryker/internal-utils';
import { JoinModule } from '@spryker/utils';
import { SelectComponent } from './select.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nz-select',
    template: ` <ng-content></ng-content> `,
})
class MockNzSelectComponent {}

class MockDatasource {
    resolve = jest.fn();
}

describe('SelectComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(SelectComponent, {
        ngModule: {
            imports: [
                JoinModule,
                DatasourceModule.withDatasources({
                    inline: MockDatasource,
                }),
            ],
            declarations: [MockNzSelectComponent],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        });
    });

    it('template must render nz-select from Ant Design and default select', async () => {
        const host = await createComponentWrapper(createComponent);
        const nzSelectElem = host.queryCss('nz-select');
        const selectElem = host.queryCss('select');

        expect(nzSelectElem).toBeTruthy();
        expect(selectElem).toBeTruthy();
    });

    describe('custom clear icon', () => {
        it('should bind templateRef to `nzClearIcon` input of <nz-select>', async () => {
            const host = await createComponentWrapper(createComponent);
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.nzClearIcon).toEqual(expect.any(TemplateRef));
        });

        it('should render <spy-icon> with `IconRemoveModule` icon', async () => {
            TestBed.overrideComponent(MockNzSelectComponent, {
                set: {
                    inputs: ['nzClearIcon'],
                    template: `<ng-container *ngTemplateOutlet="nzClearIcon"></ng-container>`,
                },
            });

            const host = await createComponentWrapper(createComponent);
            const clearIconElem = host.queryCss('nz-select spy-icon');

            expect(clearIconElem).toBeTruthy();
            expect(clearIconElem.properties.name).toBe(IconRemoveModule.icon);
            expect(clearIconElem.nativeElement.classList.contains('ant-select-selection__clear-icon')).toBe(true);
        });
    });

    describe('@Input(value) affects ngModel of nz-select', () => {
        it('should be set when value exists in options', async () => {
            const host = await createComponentWrapper(createComponent, { value: 'val1', options: ['val1', 'val2'] });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.ngModel).toBe('val1');
        });

        it('should NOT be set when value does not exist in options', async () => {
            const host = await createComponentWrapper(createComponent, { value: 'val3', options: ['val1', 'val2'] });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.ngModel).toBe(undefined);
        });
    });

    describe('Inputs must be bound to nz-select', () => {
        it('should bind search to nzShowSearch of nz-select', async () => {
            const host = await createComponentWrapper(createComponent, { search: true });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.nzShowSearch).toBe(true);
        });

        it('should bind disabled to nzDisabled of nz-select', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.nzDisabled).toBe(true);
        });

        it('should bind multiple to nzMode of nz-select', async () => {
            const host = await createComponentWrapper(createComponent, { multiple: true });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.nzMode).toBe('multiple');
        });

        it('should bind placeholder to nzPlaceHolder of nz-select', async () => {
            const mockPlaceholder = 'placeholder';
            const host = await createComponentWrapper(createComponent, { placeholder: mockPlaceholder });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.nzPlaceHolder).toBe(mockPlaceholder);
        });

        it('should bind disableClear inverted to nzAllowClear of nz-select', async () => {
            const host = await createComponentWrapper(createComponent);
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();
            expect(nzSelectElem.properties.nzAllowClear).toBe(true);

            host.setInputs({ disableClear: true }, true);

            expect(nzSelectElem.properties.nzAllowClear).toBe(false);
        });
    });

    it('options array must be correctly mapped and create each option of the dropdown', async () => {
        const mockOption = '123';
        const host = await createComponentWrapper(createComponent, { options: [mockOption] });
        const nzOption = host.queryCss('nz-option');

        expect(nzOption).toBeTruthy();
        expect(nzOption.properties.nzValue).toBe(mockOption);
        expect(nzOption.properties.nzLabel).toBe(mockOption);
    });

    it('valueChange must be emitted every time ngModelChange emits from nz-select', async () => {
        const host = await createComponentWrapper(createComponent);
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();

        nzSelectElem.triggerEventHandler('ngModelChange', []);
        host.detectChanges();

        expect(host.hostComponent.valueChange).toHaveBeenCalled();
    });

    describe('native select', () => {
        it('should bind @Input(disabled) to `disabled` property', async () => {
            const host = await createComponentWrapper(createComponent, { disabled: true });
            const selectElem = host.queryCss('select');

            expect(selectElem).toBeTruthy();
            expect(selectElem.properties.disabled).toBe(true);
        });

        it('should set multiple attribute when @Input(multiple) is `true`', async () => {
            const host = await createComponentWrapper(createComponent, { multiple: true });
            const selectElem = host.queryCss('select');

            expect(selectElem).toBeTruthy();
            expect(selectElem.attributes.multiple).toBe('');
        });

        it('should NOT set multiple attribute when @Input(multiple) is `false`', async () => {
            const host = await createComponentWrapper(createComponent, { multiple: false });
            const selectElem = host.queryCss('select');

            expect(selectElem).toBeTruthy();
            expect(selectElem.attributes.multiple).toBeFalsy();
        });

        it('should bind @Input(name) to `name` attribute', async () => {
            const mockName = 'mocked-name';
            const host = await createComponentWrapper(createComponent, { name: mockName });
            const selectElem = host.queryCss('select');

            expect(selectElem).toBeTruthy();
            expect(selectElem.attributes.name).toBe(mockName);
        });

        it('should render empty <option> tag', async () => {
            const host = await createComponentWrapper(createComponent);
            const optionElems = host.fixture.debugElement.queryAll(By.css('select option'));

            expect(optionElems.length).toBe(1);
            expect(optionElems[0].properties.value).toBe('');
        });

        it('should render <option> tags for every @Input(options) value', async () => {
            const mockOptions = [1, 2, 3];
            const host = await createComponentWrapper(createComponent, { options: mockOptions });
            const optionElems = host.fixture.debugElement.queryAll(By.css('select option'));

            expect(optionElems.length).toBe(4); // +1 for empty option
            expect(optionElems[0].properties.value).toBe('');
            expect(optionElems[1].properties.value).toBe(mockOptions[0]);
            expect(optionElems[2].properties.value).toBe(mockOptions[1]);
            expect(optionElems[3].properties.value).toBe(mockOptions[2]);
        });
    });

    describe('SelectComponent methods', () => {
        it('options array with numbers or strings should be correctly mapped', async () => {
            const mockOptions = [123, '123'];
            const host = await createComponentWrapper(createComponent, { options: mockOptions });
            const nzOptionElems = host.fixture.debugElement.queryAll(By.css('nz-option'));

            expect(nzOptionElems.length).toBe(2);
            expect(nzOptionElems[0].properties.nzValue).toBe(mockOptions[0]);
            expect(nzOptionElems[0].properties.nzLabel).toBe(mockOptions[0]);
            expect(nzOptionElems[1].properties.nzValue).toBe(mockOptions[1]);
            expect(nzOptionElems[1].properties.nzLabel).toBe(mockOptions[1]);
        });

        it('should add new option if `tags` is true', async () => {
            const mockOptions = [123, 234];
            const host = await createComponentWrapper(createComponent, {
                options: mockOptions,
                tags: true,
            });
            const nzSelectElem = host.queryCss('nz-select');
            let nzOptionElems = host.fixture.debugElement.queryAll(By.css('nz-option'));

            expect(nzOptionElems[2]).toBeFalsy();

            nzSelectElem.triggerEventHandler('ngModelChange', ['A']);
            host.detectChanges();

            nzOptionElems = host.fixture.debugElement.queryAll(By.css('nz-option'));
            expect(nzOptionElems[0].properties.nzValue).toBe('A');
        });

        it('Select All correctly triggers selection of all items', async () => {
            const mockOptions = [123, 234, 345];
            const host = await createComponentWrapper(createComponent, {
                options: mockOptions,
                multiple: true,
                showSelectAll: true,
                selectAllTitle: 'Select All',
            });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();

            nzSelectElem.triggerEventHandler('ngModelChange', [host.component.selectAllValue]);
            host.detectChanges();

            expect(nzSelectElem.properties.ngModel).toEqual(mockOptions);
        });

        it('Select All correctly triggers deselection of all items', async () => {
            const mockOptions = [123, 234, 345];
            const host = await createComponentWrapper(createComponent, {
                options: mockOptions,
                value: mockOptions,
                multiple: true,
                showSelectAll: true,
                selectAllTitle: 'Select All',
            });
            const nzSelectElem = host.queryCss('nz-select');

            expect(nzSelectElem).toBeTruthy();

            nzSelectElem.triggerEventHandler('ngModelChange', [...mockOptions, host.component.selectAllValue]);
            host.detectChanges();

            expect(nzSelectElem.properties.ngModel).toEqual([]);
        });
    });
});
