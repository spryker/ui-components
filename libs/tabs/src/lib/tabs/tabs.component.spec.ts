import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { TabsComponent } from './tabs.component';
import { TabComponent } from '../tab/tab.component';

// tslint:disable: no-non-null-assertion

describe('TabsComponent', () => {
  const projectedContent = `
    <spy-tab title="Tab Title 1">
      Tab Content 1
    </spy-tab>
    <spy-tab title="Tab Title 2">
      Tab Content 2
    </spy-tab>
    <spy-tab title="Tab Title 3">
      Tab Content 3
    </spy-tab>
  `;

  const { testModule, createComponent } = getTestingForComponent(
    TabsComponent,
    {
      ngModule: {
        imports: [],
        declarations: [TabComponent],
        exports: [TabComponent],
        schemas: [NO_ERRORS_SCHEMA],
      },
      projectContent: projectedContent,
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <nz-tabset>', async () => {
    const host = await createComponent();
    const tabsElement = host.queryCss('nz-tabset')!;

    host.detectChanges();

    expect(tabsElement).toBeTruthy();
  });

  it('should render projected content inside <span class="ant-tabs-projected-content">', async () => {
    const host = await createComponent({}, true);
    const spanWrapper = host.queryCss('.ant-tabs-projected-content')!;

    expect(spanWrapper.nativeElement.querySelector('spy-tab')).toBeTruthy();
  });

  describe('@Input(tab)', () => {
    it('should by default have value 0', async () => {
      const host = await createComponent();

      expect(host.component.tab).toBe(0);
    });

    it('should bind on nzSelectedIndex of nz-tabset', async () => {
      const host = await createComponent({ tab: 1 }, true);
      const tabsElement = host.queryCss('nz-tabset')!;

      expect(tabsElement.properties.nzSelectedIndex).toBe(1);
    });
  });

  describe('@Input(mode)', () => {
    it('should by default have value `line`', async () => {
      const host = await createComponent();

      expect(host.component.mode).toBe('line');
    });

    it('should bind on nzType of nz-tabset', async () => {
      const host = await createComponent({ mode: 'card' }, true);
      const tabsElement = host.queryCss('nz-tabset')!;

      expect(tabsElement.properties.nzType).toBe('card');
    });
  });

  describe('@Input(isAnimated)', () => {
    it('should bind to `nzAnimated` of <nz-tabset>', async () => {
      const host = await createComponent({ isAnimated: true }, true);
      const tabsElement = host.queryCss('nz-tabset')!;

      expect(tabsElement.properties.nzAnimated).toBe(true);
    });
  });

  describe('component.toNextTab', () => {
    it('should increase tab property', async () => {
      const host = await createComponent({ tab: 0, mode: 'line' }, true);

      host.component.toNextTab();
      host.detectChanges();

      expect(host.component.tab).toBe(1);
    });

    it('should emit tabChange on toNextTab', async () => {
      const host = await createComponent({ tab: 0 }, true);

      host.component.toNextTab();
      host.detectChanges();

      expect(host.hostComponent.tabChange).toHaveBeenCalledWith(1);
    });
  });

  describe('component.toPrevTab', () => {
    it('should decrease tab property', async () => {
      const host = await createComponent({ tab: 1 }, true);
      host.component.toPrevTab();

      host.detectChanges();

      expect(host.component.tab).toBe(0);
    });

    it('should emit tabChange on toPrevTab', async () => {
      const host = await createComponent({ tab: 1 }, true);

      host.component.toPrevTab();
      host.detectChanges();

      expect(host.hostComponent.tabChange).toHaveBeenCalledWith(0);
    });
  });

  describe('component.activateTab', () => {
    it('should change tab property with new value', async () => {
      const host = await createComponent({ tab: 0 }, true);
      host.component.activateTab(1);

      host.detectChanges();

      expect(host.component.tab).toBe(1);
    });

    it('should emit tabChange on activateTab', async () => {
      const host = await createComponent({ tab: 0 }, true);

      host.component.activateTab(1);
      host.detectChanges();

      expect(host.hostComponent.tabChange).toHaveBeenCalled();
    });
  });
});
