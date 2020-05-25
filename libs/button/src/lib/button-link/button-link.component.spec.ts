import { TestBed } from '@angular/core/testing';

import { ButtonLinkComponent } from './button-link.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

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

    it('should concate variant, shape, size inputs and add them to class list of <a>', async () => {
      const host = await createComponent(
        { variant: 'critical', shape: 'default', size: 'lg' },
        true,
      );
      const buttonLinkElem = host.queryCss('a')!;

      expect(buttonLinkElem.properties.className).toContain('critical');
      expect(buttonLinkElem.properties.className).toContain('default');
      expect(buttonLinkElem.properties.className).toContain('lg');
    });

    it('should bind attrs to spyApplyAttrs properties of <a>', async () => {
      const mockedAttrs = { mockAttr: 'mockAttr' };
      const host = await createComponent({ attrs: mockedAttrs }, true);
      const buttonLinkElem = host.queryCss('a')!;

      expect(buttonLinkElem.properties.spyApplyAttrs).toBe(mockedAttrs);
    });
  });
});
