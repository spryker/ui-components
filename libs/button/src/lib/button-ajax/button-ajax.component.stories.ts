import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { buttonClassName } from '../button-core-inputs/button-core-inputs';
import {
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '../button-core-inputs/types';
import { ButtonAjaxComponent } from './button-ajax.component';

// tslint:disable: no-non-null-assertion

describe('ButtonComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    ButtonAjaxComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <button>', async () => {
    const host = await createComponent();

    host.detectChanges();

    const buttonAjaxElem = host.queryCss('button');

    expect(buttonAjaxElem).toBeTruthy();
  });

  it('should render projected content inside <a>', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('button')!;

    host.detectChanges();

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  describe('@Inputs', () => {
    it('should bind input url to url of <button>', async () => {
      const host = await createComponent({ url: 'someUrl' as any }, true);
      const buttonLinkElem = host.queryCss('a')!;

      expect(buttonLinkElem.properties.url).toBe('someUrl');
    });
  });
});
