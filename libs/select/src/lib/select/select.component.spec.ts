/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { DatasourceModule } from '@spryker/datasource';
import { IconRemoveModule } from '@spryker/icon/icons';
import { JoinModule } from '@spryker/utils';

import { SelectComponent } from './select.component';
import { OptionComponent } from '../option/option.component';
import { SelectedOptionComponent } from '../selected-option/selected-option.component';

class MockDatasource {
  resolve = jest.fn();
}

describe('SelectComponent', () => {
<<<<<<< HEAD
  describe('SelectComponent tests with input options', () => {
    @Component({
      // tslint:disable-next-line: component-selector
      selector: 'nz-select',
      template: ` <ng-content></ng-content> `,
    })
    class MockNzSelectComponent {}

    const { testModule, createComponent } = getTestingForComponent(
      SelectComponent,
      {
        ngModule: {
          imports: [
            JoinModule,
            DatasourceModule.withDatasources({
              inline: MockDatasource,
            }),
          ],
          schemas: [NO_ERRORS_SCHEMA],
          declarations: [MockNzSelectComponent],
        },
      },
    );
=======
  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'nz-select',
    template: ` <ng-content></ng-content> `,
  })
  class MockNzSelectComponent {}

  const { testModule, createComponent } = getTestingForComponent(
    SelectComponent,
    {
      ngModule: {
        imports: [
          JoinModule,
          DatasourceModule.withDatasources({
            inline: MockDatasource,
          }),
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [MockNzSelectComponent],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      teardown: { destroyAfterEach: false },
    });
  });
>>>>>>> master

    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [testModule] });
    });

    it('template must render nz-select from Ant Design and default select', async () => {
      const host = await createComponent({}, true);
      const nzSelectElem = host.queryCss('nz-select');
      const selectElem = host.queryCss('select');

      expect(nzSelectElem).toBeTruthy();
      expect(selectElem).toBeTruthy();
    });

    describe('custom clear icon', () => {
      it('should bind templateRef to `nzClearIcon` input of `nz-select`', async () => {
        const host = await createComponent({}, true);
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.nzClearIcon).toEqual(
          expect.any(TemplateRef),
        );
      });

      it('should render <spy-icon> with `IconRemoveModule` icon', async () => {
        TestBed.overrideComponent(MockNzSelectComponent, {
          set: {
            inputs: ['nzClearIcon'],
            template: `<ng-container *ngTemplateOutlet="nzClearIcon"></ng-container>`,
          },
        });

        const host = await createComponent({}, true);
        const clearIconElem = host.queryCss('nz-select spy-icon');

        expect(clearIconElem).toBeTruthy();
        expect(clearIconElem!.properties.name).toBe(IconRemoveModule.icon);
        expect(
          clearIconElem!.nativeElement.classList.contains(
            'ant-select-selection__clear-icon',
          ),
        ).toBe(true);
      });
    });

    describe('@Input(value) affects ngModel of nz-select', () => {
      it('should be set when value exists in options', async () => {
        const host = await createComponent(
          { value: 'val1', options: ['val1', 'val2'] },
          true,
        );
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.ngModel).toBe('val1');
      });

      it('should NOT be set when value does not exist in options', async () => {
        const host = await createComponent(
          { value: 'val3', options: ['val1', 'val2'] },
          true,
        );
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.ngModel).toBe(undefined);
      });
    });

    describe('Inputs must be bound to nz-select', () => {
      it('should bind search to nzShowSearch of nz-select', async () => {
        const host = await createComponent({ search: true }, true);
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.nzShowSearch).toBe(true);
      });

      it('should bind disabled to nzDisabled of nz-select', async () => {
        const host = await createComponent({ disabled: true }, true);
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.nzDisabled).toBe(true);
      });

      it('should bind multiple to nzMode of nz-select', async () => {
        const host = await createComponent({ multiple: true }, true);
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.nzMode).toBe('multiple');
      });

      it('should bind placeholder to nzPlaceHolder of nz-select', async () => {
        const host = await createComponent(
          { placeholder: 'placeholder' },
          true,
        );
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.nzPlaceHolder).toBe('placeholder');
      });

      it('should bind disableClear inverted to nzAllowClear of nz-select', async () => {
        const host = await createComponent({}, true);
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();
        expect(nzSelectElem!.properties.nzAllowClear).toBe(true);

        host.setInputs({ disableClear: true }, true);

        expect(nzSelectElem!.properties.nzAllowClear).toBe(false);
      });
    });

    it('options array must be correctly mapped and create each option of the dropdown', async () => {
      const host = await createComponent({ options: ['123'] }, true);
      const nzOption = host.queryCss('nz-option');

      expect(nzOption).toBeTruthy();
      expect(nzOption!.properties.nzValue).toBe('123');
      expect(nzOption!.properties.nzLabel).toBe('123');
    });

    it('valueChange must be emitted every time ngModelChange emits from nz-select', async () => {
      const host = await createComponent({}, true);
      const nzSelectElem = host.queryCss('nz-select');

      expect(nzSelectElem).toBeTruthy();

      nzSelectElem!.triggerEventHandler('ngModelChange', []);
      host.detectChanges();

      expect(host.hostComponent.valueChange).toHaveBeenCalled();
    });

    describe('native select', () => {
      it('should bind @Input(disabled) to `disabled` property', async () => {
        const host = await createComponent({ disabled: true }, true);
        const selectElem = host.queryCss('select');

        expect(selectElem).toBeTruthy();
        expect(selectElem!.properties.disabled).toBe(true);
      });

      it('should set multiple attribute when @Input(multiple) is `true`', async () => {
        const host = await createComponent({ multiple: true }, true);
        const selectElem = host.queryCss('select');

        expect(selectElem).toBeTruthy();
        expect(selectElem!.attributes.multiple).toBe('');
      });

      it('should NOT set multiple attribute when @Input(multiple) is `false`', async () => {
        const host = await createComponent({ multiple: false }, true);
        const selectElem = host.queryCss('select');

        expect(selectElem).toBeTruthy();
        expect(selectElem!.attributes.multiple).toBeFalsy();
      });

      it('should bind @Input(name) to `name` attribute', async () => {
        const host = await createComponent({ name: 'mocked-name' }, true);
        const selectElem = host.queryCss('select');

        expect(selectElem).toBeTruthy();
        expect(selectElem!.attributes.name).toBe('mocked-name');
      });

      it('should render empty <option> tag', async () => {
        const host = await createComponent({}, true);
        const optionElems = host.fixture.debugElement.queryAll(
          By.css('select option'),
        );

        expect(optionElems.length).toBe(1);
        expect(optionElems[0].properties.value).toBe(undefined);
      });

      it('should render <option> tags for every @Input(options) value', async () => {
        const host = await createComponent({ options: [1, 2, 3] }, true);
        const optionElems = host.fixture.debugElement.queryAll(
          By.css('select option'),
        );

        expect(optionElems.length).toBe(4); // +1 for empty option
        expect(optionElems[0].properties.value).toBe(undefined);
        expect(optionElems[1].properties.value).toBe(1);
        expect(optionElems[2].properties.value).toBe(2);
        expect(optionElems[3].properties.value).toBe(3);
      });
    });

    describe('SelectComponent methods', () => {
      it('options array with numbers or strings should be correctly mapped', async () => {
        const host = await createComponent({ options: [123, '123'] }, true);
        const nzOptionElems = host.fixture.debugElement.queryAll(
          By.css('nz-option'),
        );

        expect(nzOptionElems.length).toBe(2);
        expect(nzOptionElems[0].properties.nzValue).toBe(123);
        expect(nzOptionElems[0].properties.nzLabel).toBe(123);
        expect(nzOptionElems[1].properties.nzValue).toBe('123');
        expect(nzOptionElems[1].properties.nzLabel).toBe('123');
      });

      it('Select All correctly triggers selection of all items', async () => {
        const host = await createComponent(
          {
            options: [123, 234, 345],
            multiple: true,
            showSelectAll: true,
            selectAllTitle: 'Select All',
          },
          true,
        );
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();

        nzSelectElem!.triggerEventHandler('ngModelChange', [
          host.component.selectAllValue,
        ]);
        host.detectChanges();

        expect(nzSelectElem!.properties.ngModel).toEqual([123, 234, 345]);
      });

      it('Select All correctly triggers deselection of all items', async () => {
        const host = await createComponent(
          {
            options: [123, 234, 345],
            value: [123, 234, 345],
            multiple: true,
            showSelectAll: true,
            selectAllTitle: 'Select All',
          },
          true,
        );
        const nzSelectElem = host.queryCss('nz-select');

        expect(nzSelectElem).toBeTruthy();

        nzSelectElem!.triggerEventHandler('ngModelChange', [
          123,
          234,
          345,
          host.component.selectAllValue,
        ]);
        host.detectChanges();

        expect(nzSelectElem!.properties.ngModel).toEqual([]);
      });
    });
  });

  describe('SelectComponent with options in template', () => {
    const projectedOptionValues = ['projected-option1', 'projected-option2'];
    const projectedContent = `
      <spy-option value="${projectedOptionValues[0]}">
          <span style="color: red; font-weight: 400">Red text</span>
      </spy-option>
      <spy-option value="${projectedOptionValues[1]}">
          <span style="font-weight: 700">Bold text</span>
      </spy-option>
      <spy-selected-option>
        <span before>before</span>
        <span after>after</span>
      </spy-selected-option>
  `;

    const { testModule, createComponent } = getTestingForComponent(
      SelectComponent,
      {
        ngModule: {
          imports: [
            JoinModule,
            DatasourceModule.withDatasources({
              inline: MockDatasource,
            }),
          ],
          schemas: [NO_ERRORS_SCHEMA],
          declarations: [OptionComponent, SelectedOptionComponent],
          exports: [OptionComponent, SelectedOptionComponent],
        },
        projectContent: projectedContent,
      },
    );

    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [testModule] });
    });

    it('should render projected options', fakeAsync(async () => {
      const host = await createComponent({ customOptionTemplate: true }, true);
      tick();
      host.detectChanges();

      const projectedOptionEls = host.hostElement.queryAll(By.css('nz-option'));
      expect(projectedOptionEls.length).toBe(projectedOptionValues.length);
      const projectedOptionEl = projectedOptionEls[0];
      expect(projectedOptionEl.attributes.nzCustomContent).toBe('');
      expect(projectedOptionEl.properties.nzLabel).toBeUndefined();
      expect(projectedOptionEl.properties.nzValue).toBe(
        projectedOptionValues[0],
      );
    }));

    it('should render custom selected template', fakeAsync(async () => {
      const host = await createComponent({ customOptionTemplate: true }, true);
      tick();
      host.detectChanges();

      const selectComponentEl = host.queryCss('nz-select');
      expect(selectComponentEl).toBeTruthy();
      expect(
        selectComponentEl?.properties.nzCustomTemplate instanceof TemplateRef,
      ).toBeTruthy();
    }));
  });
});
