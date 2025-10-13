import { NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatasourceModule } from '@spryker/datasource';
import { IconRemoveModule } from '@spryker/icon/icons';
import { JoinModule } from '@spryker/utils';
import { SelectComponent } from './select.component';

class MockDatasource {
    resolve = jest.fn();
}

describe('SelectComponent', () => {
    let fixture: any;
    const q = (css: string) => fixture.debugElement.query(By.css(css));
    const qAll = (css: string) => fixture.debugElement.queryAll(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectComponent],
            imports: [JoinModule, DatasourceModule.withDatasources({ inline: MockDatasource })],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(SelectComponent);
    });

    it('template must render nz-select from Ant Design and default select', () => {
        fixture.detectChanges();
        expect(q('nz-select')).toBeTruthy();
        expect(q('select')).toBeTruthy();
    });

    describe('custom clear icon', () => {
        it('should bind templateRef to `nzClearIcon` input of <nz-select>', () => {
            fixture.detectChanges();
            const nzSelectDe = q('nz-select');
            expect(nzSelectDe).toBeTruthy();

            expect(nzSelectDe.nativeNode.nzClearIcon).toEqual(expect.any(TemplateRef));
        });

        it('should render <spy-icon> with `IconRemoveModule` icon', () => {
            fixture.detectChanges();
            const nzSelectDe = q('nz-select');
            const tpl = nzSelectDe.nativeNode.nzClearIcon as TemplateRef<unknown>;

            const vcr: ViewContainerRef =
                (fixture.componentRef as any)._hostLView?.[8] ??
                (fixture as any)._viewContainerRef ??
                fixture.debugElement.injector.get(ViewContainerRef);

            const viewRef = vcr.createEmbeddedView(tpl);
            viewRef.detectChanges();
            fixture.detectChanges();

            const iconDe = fixture.debugElement.query(By.css('spy-icon.ant-select-selection__clear-icon'));
            expect(iconDe).toBeTruthy();
            expect(iconDe.properties.name).toBe(IconRemoveModule.icon);
        });
    });

    describe('@Input(value) affects ngModel of nz-select', () => {
        it('should be set when value exists in options', () => {
            fixture.componentRef.setInput('value', 'val1');
            fixture.componentRef.setInput('options', ['val1', 'val2']);
            fixture.detectChanges();

            const nzSelectDe = q('nz-select');
            expect(nzSelectDe.nativeNode.ngModel).toBe('val1');
        });

        it('should NOT be set when value does not exist in options', () => {
            fixture.componentRef.setInput('value', 'val3');
            fixture.componentRef.setInput('options', ['val1', 'val2']);
            fixture.detectChanges();

            const nzSelectDe = q('nz-select');
            expect(nzSelectDe.nativeNode.ngModel).toBeUndefined();
        });
    });

    describe('Inputs must be bound to nz-select', () => {
        it('should bind search to nzShowSearch of nz-select', () => {
            fixture.componentRef.setInput('search', true);
            fixture.detectChanges();

            expect(q('nz-select').nativeNode.nzShowSearch).toBe(true);
        });

        it('should bind disabled to nzDisabled of nz-select', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            expect(q('nz-select').nativeNode.nzDisabled).toBe(true);
        });

        it('should bind multiple to nzMode of nz-select', () => {
            fixture.componentRef.setInput('multiple', true);
            fixture.detectChanges();

            expect(q('nz-select').nativeNode.nzMode).toBe('multiple');
        });

        it('should bind placeholder to nzPlaceHolder of nz-select', () => {
            fixture.componentRef.setInput('placeholder', 'placeholder');
            fixture.detectChanges();

            expect(q('nz-select').nativeNode.nzPlaceHolder).toBe('placeholder');
        });

        it('should bind disableClear inverted to nzAllowClear of nz-select', () => {
            fixture.detectChanges();
            expect(q('nz-select').nativeNode.nzAllowClear).toBe(true);

            fixture.componentRef.setInput('disableClear', true);
            fixture.detectChanges();

            expect(q('nz-select').nativeNode.nzAllowClear).toBe(false);
        });
    });

    it('options array must be correctly mapped and create each option of the dropdown', () => {
        fixture.componentRef.setInput('options', ['123']);
        fixture.detectChanges();
        fixture.detectChanges();
        fixture.detectChanges();

        const nzOptionDe = q('nz-option');
        expect(nzOptionDe).toBeTruthy();
        expect(nzOptionDe.nativeNode.nzValue).toBe('123');
        expect(nzOptionDe.nativeNode.nzLabel).toBe('123');
    });

    it('valueChange must be emitted every time ngModelChange emits from nz-select', () => {
        const nzSelectDe = q('nz-select');
        const emitSpy = jest.spyOn(fixture.componentInstance.valueChange, 'emit');

        nzSelectDe.triggerEventHandler('ngModelChange', []);
        fixture.detectChanges();

        expect(emitSpy).toHaveBeenCalled();
    });

    describe('native select', () => {
        it('should bind @Input(disabled) to `disabled` property', () => {
            fixture.componentRef.setInput('disabled', true);
            fixture.detectChanges();

            const selDe = q('select');
            expect(selDe.nativeElement.disabled).toBe(true);
        });

        it('should set multiple attribute when @Input(multiple) is `true`', () => {
            fixture.componentRef.setInput('multiple', true);
            fixture.detectChanges();

            expect(q('select').attributes['multiple']).toBe('');
        });

        it('should NOT set multiple attribute when @Input(multiple) is `false`', () => {
            fixture.componentRef.setInput('multiple', false);
            fixture.detectChanges();

            expect(q('select').attributes['multiple']).toBeFalsy();
        });

        it('should bind @Input(name) to `name` attribute', () => {
            fixture.componentRef.setInput('name', 'mocked-name');
            fixture.detectChanges();

            expect(q('select').attributes['name']).toBe('mocked-name');
        });

        it('should render empty <option> tag', () => {
            fixture.detectChanges();
            const opts = qAll('select option');
            expect(opts.length).toBe(1);
            expect(opts[0].nativeElement.value).toBe('');
        });

        it('should render <option> tags for every @Input(options) value', () => {
            const mockOptions = [1, 2, 3];
            fixture.componentRef.setInput('options', mockOptions);
            fixture.detectChanges();

            const opts = qAll('select option');
            expect(opts.length).toBe(4);
            expect(opts[0].nativeElement.value).toBe('');
            expect(opts[1].nativeElement.value).toBe(String(mockOptions[0]));
            expect(opts[2].nativeElement.value).toBe(String(mockOptions[1]));
            expect(opts[3].nativeElement.value).toBe(String(mockOptions[2]));
        });
    });

    describe('SelectComponent methods', () => {
        it('options array with numbers or strings should be correctly mapped', () => {
            const mockOptions = [123, '123'];
            fixture.componentRef.setInput('options', mockOptions);
            fixture.detectChanges();

            const nzOptions = qAll('nz-option');
            expect(nzOptions.length).toBe(2);
            expect(nzOptions[0].nativeNode.nzValue).toBe(mockOptions[0]);
            expect(nzOptions[0].nativeNode.nzLabel).toBe(String(mockOptions[0]));
            expect(nzOptions[1].nativeNode.nzValue).toBe(mockOptions[1]);
            expect(nzOptions[1].nativeNode.nzLabel).toBe(mockOptions[1]);
        });

        it('should add new option if `tags` is true', () => {
            const mockOptions = [123, 234];
            fixture.componentRef.setInput('options', mockOptions);
            fixture.componentRef.setInput('tags', true);
            fixture.detectChanges();

            let nzOptions = qAll('nz-option');
            expect(nzOptions[2]).toBeFalsy();

            const nzSelectDe = q('nz-select');
            nzSelectDe.triggerEventHandler('ngModelChange', ['A']);
            fixture.detectChanges();

            nzOptions = qAll('nz-option');
            expect(nzOptions[0].nativeNode.nzValue).toBe('A');
        });

        it('Select All correctly triggers selection of all items', () => {
            const mockOptions = [123, 234, 345];
            fixture.componentRef.setInput('options', mockOptions);
            fixture.componentRef.setInput('multiple', true);
            fixture.componentRef.setInput('showSelectAll', true);
            fixture.componentRef.setInput('selectAllTitle', 'Select All');
            fixture.detectChanges();

            const nzSelectDe = q('nz-select');
            nzSelectDe.triggerEventHandler('ngModelChange', [(fixture.componentInstance as any).selectAllValue]);
            fixture.detectChanges();

            expect(nzSelectDe.nativeNode.ngModel).toEqual(mockOptions);
        });

        it('Select All correctly triggers deselection of all items', () => {
            const mockOptions = [123, 234, 345];
            fixture.componentRef.setInput('options', mockOptions);
            fixture.componentRef.setInput('value', mockOptions);
            fixture.componentRef.setInput('multiple', true);
            fixture.componentRef.setInput('showSelectAll', true);
            fixture.componentRef.setInput('selectAllTitle', 'Select All');
            fixture.detectChanges();

            const nzSelectDe = q('nz-select');
            nzSelectDe.triggerEventHandler('ngModelChange', [
                ...mockOptions,
                (fixture.componentInstance as any).selectAllValue,
            ]);
            fixture.detectChanges();

            expect(nzSelectDe.nativeNode.ngModel).toEqual([]);
        });
    });
});
