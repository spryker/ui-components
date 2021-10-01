import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { buttonClassName } from '../button-core/button-core';
import { ButtonShape, ButtonSize, ButtonVariant } from '../button-core/types';
import { ButtonComponent, ButtonType } from './button.component';

// tslint:disable: no-non-null-assertion

describe('ButtonComponent', () => {
  const buttonCls = 'spy-button';

  const { testModule, createComponent } = getTestingForComponent(
    ButtonComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: `
        <span class='icon-element' icon></span>
        Content
      `,
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <button>', async () => {
    const host = await createComponent({}, true);
    const buttonElem = host.queryCss('button')!;

    expect(buttonElem).toBeTruthy();
  });

  it('should render projected content inside <button>', async () => {
    const host = await createComponent({}, true);
    const buttonElem = host.queryCss('button')!;

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  it('should add static classes to host element', async () => {
    const host = await createComponent({}, true);

    expect(host.element.classes[buttonClassName]).toBeTruthy();
    expect(host.element.classes[buttonCls]).toBeTruthy();
  });

  it('should add static classes to `button` element', async () => {
    const host = await createComponent({}, true);
    const buttonElem = host.queryCss('button')!;

    expect(buttonElem.classes[`${buttonClassName}__btn`]).toBeTruthy();
    expect(buttonElem.classes[`${buttonCls}__btn`]).toBeTruthy();
  });

  it('should render icon in the `.spy-button-core__btn-icon` element', async () => {
    const host = await createComponent({}, true);
    const iconElement = host.queryCss(
      '.spy-button-core__btn-icon .icon-element',
    )!;

    expect(iconElement).toBeTruthy();
  });

  it('should add appropriate @Input(variant), @Input(shape), @Input(size) classes to the host', async () => {
    const host = await createComponent(
      {
        variant: ButtonVariant.Critical,
        shape: ButtonShape.Circle,
        size: ButtonSize.Large,
      },
      true,
    );

    expect(
      host.element.classes[`${buttonClassName}--${ButtonVariant.Critical}`],
    ).toBeTruthy();
    expect(
      host.element.classes[`${buttonCls}--${ButtonVariant.Critical}`],
    ).toBeTruthy();
    expect(
      host.element.classes[`${buttonClassName}--${ButtonShape.Circle}`],
    ).toBeTruthy();
    expect(
      host.element.classes[`${buttonCls}--${ButtonShape.Circle}`],
    ).toBeTruthy();
    expect(
      host.element.classes[`${buttonClassName}--${ButtonSize.Large}`],
    ).toBeTruthy();
    expect(
      host.element.classes[`${buttonCls}--${ButtonSize.Large}`],
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

  it('should add default @Input(variant), @Input(shape), @Input(size) properties, when undefined passed', async () => {
    const host = await createComponent(
      {
        variant: undefined,
        shape: undefined,
        size: undefined,
        type: undefined,
      },
      true,
    );
    const component = host.component;

    expect(component.size).toBe(ButtonSize.Medium);
    expect(component.shape).toBe(ButtonShape.Default);
    expect(component.variant).toBe(ButtonVariant.Primary);
  });
});
