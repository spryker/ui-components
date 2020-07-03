import { TestBed } from '@angular/core/testing';

import { ButtonLinkComponent } from './button-link.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import {
  ButtonSize,
  ButtonVariant,
  ButtonShape,
} from '../button-core-options/types';

// tslint:disable: no-non-null-assertion

describe('ButtonComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    ButtonLinkComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <a>', async () => {
    const host = await createComponent();

    host.detectChanges();

    const buttonLinkElem = host.queryCss('a');

    expect(buttonLinkElem).toBeTruthy();
  });

  it('should render projected content inside <a>', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('a')!;

    host.detectChanges();

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  describe('@Inputs', () => {
    it('should bind input url to href of <a>', async () => {
      const host = await createComponent({ url: 'someUrl' as any }, true);
      const buttonLinkElem = host.queryCss('a')!;

      expect(buttonLinkElem.properties.href).toBe('someUrl');
    });

    it('should add appropriate @Input(variant), @Input(shape), @Input(size) classes to the `<a>`', async () => {
      const host = await createComponent(
        {
          variant: ButtonVariant.Critical,
          shape: ButtonShape.Circle,
          size: ButtonSize.Large,
        },
        true,
      );
      const buttonLinkElem = host.queryCss('a')!;

      expect(buttonLinkElem.properties.className).toContain(
        ButtonVariant.Critical,
      );
      expect(buttonLinkElem.properties.className).toContain(ButtonShape.Circle);
      expect(buttonLinkElem.properties.className).toContain(ButtonSize.Large);
    });

    it('should bind attrs to spyApplyAttrs properties of <a>', async () => {
      const mockedAttrs = { mockAttr: 'mockAttr' };
      const host = await createComponent({ attrs: mockedAttrs }, true);
      const buttonLinkElem = host.queryCss('a')!;

      expect(buttonLinkElem.properties.spyApplyAttrs).toBe(mockedAttrs);
    });
  });
});
