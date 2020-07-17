import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TreeSelectComponent } from './tree-select.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { JoinModule } from '@spryker/utils';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { By } from '@angular/platform-browser';

describe('TreeSelectComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    TreeSelectComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
        imports: [NzTreeSelectModule, JoinModule],
      },
    },
  );

  const nzTreeSelect = 'nz-tree-select';
  const nativeSelect = 'select';
  const mockedValue = 'mockedValue';
  const mockedPlaceholder = 'mockedPlaceholder';
  const mockedName = 'mockedName';
  const mockedNoOptionsText = 'mockedNoOptionsText';
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

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
  });

  it('should render nz-tree-select component from Ant Design and native select', async () => {
    const host = await createComponent({ items: mockItems }, true);

    const treeSelect = host.queryCss(nzTreeSelect);
    const select = host.queryCss(nativeSelect);

    expect(treeSelect).toBeTruthy();
    expect(select).toBeTruthy();
  });

  describe('@Input', () => {
    it('should render <option> tags for every @Input(items)', async () => {
      const host = await createComponent(
        { items: mockItems, value: mockedValue },
        true,
      );
      const optionElems = host.fixture.debugElement.queryAll(
        By.css('select option'),
      );

      expect(optionElems.length).toBe(4); // +1 for empty option
      expect(optionElems[0].properties.value).toBe(undefined);
      expect(optionElems[1].properties.value).toBe(mockItems[0].value);
      expect(optionElems[2].properties.value).toBe(mockItems[1].value);
      expect(optionElems[3].properties.value).toBe(mockItems[2].value);
    });

    it('Input value should be bound to ngModel of nz-tree-select', async () => {
      const host = await createComponent(
        { items: mockItems, value: mockedValue },
        true,
      );

      const treeSelect = host.queryCss(nzTreeSelect);

      expect(treeSelect?.properties.ngModel).toBe(mockedValue);
    });

    it('Input search should be bound to nzShowSearch of nz-tree-select', async () => {
      const host = await createComponent(
        { items: mockItems, search: true },
        true,
      );

      const treeSelect = host.queryCss(nzTreeSelect);

      expect(treeSelect?.attributes['ng-reflect-nz-show-search']).toBeTruthy();
    });

    it('Input disasbled should be bound to nzDisabled of nz-tree-select and disabled property of select', async () => {
      const host = await createComponent(
        { items: mockItems, disabled: true },
        true,
      );

      const treeSelect = host.queryCss(nzTreeSelect);
      const select = host.queryCss(nativeSelect);

      expect(treeSelect?.attributes['ng-reflect-nz-disabled']).toBeTruthy();
      expect(select?.properties.disabled).toBeTruthy();
    });

    it('Input placeholder should be bound to nzPlaceholder of nz-tree-select', async () => {
      const host = await createComponent(
        { items: mockItems, placeholder: mockedPlaceholder },
        true,
      );

      const treeSelect = host.queryCss(nzTreeSelect);

      expect(treeSelect?.attributes['ng-reflect-nz-place-holder']).toBe(
        mockedPlaceholder,
      );
    });

    it('Input name should be bound to HTML select', async () => {
      const host = await createComponent(
        { items: mockItems, name: mockedName },
        true,
      );

      const select = host.queryCss(nativeSelect);

      expect(select?.attributes.name).toBe(mockedName);
    });

    it('Input noOptionsText should be bound to nzNotFoundContent of nz-tree-select', async () => {
      const host = await createComponent(
        { items: mockItems, noOptionsText: mockedNoOptionsText },
        true,
      );

      const treeSelect = host.queryCss(nzTreeSelect);

      expect(treeSelect?.attributes['ng-reflect-nz-not-found-content']).toBe(
        mockedNoOptionsText,
      );
    });

    it('Input disableClear should be bound to nzAllowClear of nz-tree-select', async () => {
      const host = await createComponent(
        { items: mockItems, disableClear: true },
        true,
      );

      const treeSelect = host.queryCss(nzTreeSelect);

      expect(treeSelect?.attributes['ng-reflect-nz-allow-clear']).toBe('false');
    });
  });

  describe('@Output', () => {
    it('Output valueChange should be emitted every time when the ngModelChange emits on nz-tree-select', async () => {
      const host = await createComponent({ items: mockItems }, true);

      host.hostComponent.valueChange = jest.fn();

      const treeSelect = host.queryCss(nzTreeSelect);

      treeSelect?.triggerEventHandler('ngModelChange', mockedCallValue);

      expect(host.hostComponent.valueChange).toHaveBeenCalledWith(
        mockedCallValue,
      );
    });
  });
});
