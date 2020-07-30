import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { ButtonToggleComponent } from './button-toggle.component';

// tslint:disable: no-non-null-assertion

describe('ButtonToggleComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    ButtonToggleComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <spy-button-toggle>', async () => {
    const host = await createComponent();

    host.detectChanges();

    const buttonElem = host.queryCss('spy-button-toggle');

    expect(buttonElem).toBeTruthy();
  });

  it('should render projected content inside <button>', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('button')!;

    host.detectChanges();

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  it('should bind attrs to spyApplyAttrs properties of <button>', async () => {
    const mockedAttrs = { mockAttr: 'mockAttr' };
    const host = await createComponent({ attrs: mockedAttrs }, true);
    const buttonElem = host.queryCss('button')!;

    expect(buttonElem.properties.spyApplyAttrs).toBe(mockedAttrs);
  });

  it('toggledChange must be emited after click event happened on button', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('button');
    spyOn(host.component.toggledChange, 'emit');

    buttonElem!.triggerEventHandler('click', {});

    host.detectChanges();
    expect(host.component.toggledChange.emit).toHaveBeenCalledWith(true);
  });

  it('class `spy-btn-toggle--toggled` should be added after click event happened', async () => {
    const host = await createComponent({ toggled: true });
    const buttonElem = host.queryCss('button');

    buttonElem!.triggerEventHandler('click', {});

    host.detectChanges();

    expect(buttonElem?.classes['spy-btn-toggle--toggled']).toBeTruthy();
  });

  describe('@Input(disabled)', () => {
    it('should by default have value `false`', async () => {
      const host = await createComponent();
      expect(host.component.disabled).toBe(false);
    });

    it('should bind to `disabled` of <button>', async () => {
      const host = await createComponent({ disabled: true }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.disabled).toBe(true);
    });
  });
});
