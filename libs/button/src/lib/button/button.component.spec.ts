import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { buttonClassName } from '../button-core-inputs/button-core-inputs';
import {
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '../button-core-inputs/types';
import { ButtonComponent } from './button.component';

// tslint:disable: no-non-null-assertion

describe('ButtonComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    ButtonComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <button>', async () => {
    const host = await createComponent();

    host.detectChanges();

    const buttonElem = host.queryCss('button');

    expect(buttonElem).toBeTruthy();
  });

  it('should render projected content inside <button>', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('button')!;

    host.detectChanges();

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  it('should add appropriate @Input(variant), @Input(shape), @Input(size) classes to the `<button>`', async () => {
    const host = await createComponent({
      variant: ButtonVariant.Critical,
      shape: ButtonShape.Circle,
      size: ButtonSize.Large,
    });
    host.component.buttonClassName = buttonClassName;
    host.detectChanges();
    const buttonElem = host.queryCss('button')!;

    expect(
      buttonElem.classes[`${buttonClassName}--${ButtonVariant.Critical}`],
    ).toBeTruthy();
    expect(
      buttonElem.classes[`${buttonClassName}--${ButtonShape.Circle}`],
    ).toBeTruthy();
    expect(
      buttonElem.classes[`${buttonClassName}--${ButtonSize.Large}`],
    ).toBeTruthy();
  });

  it('should bind attrs to spyApplyAttrs properties of <button>', async () => {
    const mockedAttrs = { mockAttr: 'mockAttr' };
    const host = await createComponent({ attrs: mockedAttrs }, true);
    const buttonLinkElem = host.queryCss('button')!;

    expect(buttonLinkElem.properties.spyApplyAttrs).toBe(mockedAttrs);
  });

  describe('@Input(type)', () => {
    it('should by default have value `button`', async () => {
      const host = await createComponent();
      expect(host.component.type).toBe('button');
    });

    it('should bind to `type` of <button>', async () => {
      const host = await createComponent({ type: 'value' as any }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.type).toBe('value');
    });
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
