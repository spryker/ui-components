import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

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

  it('should render <button> with `nz-button` attribute', async () => {
    const host = await createComponent();

    host.detectChanges();

    const buttonElem = host.queryCss('button');

    expect(buttonElem).toBeTruthy();
    expect(buttonElem!.attributes['nz-button']).toBeDefined();
  });

  it('should render projected content inside <button>', async () => {
    const host = await createComponent();
    const buttonElem = host.queryCss('button')!;

    host.detectChanges();

    expect(buttonElem.nativeElement.textContent).toMatch('Content');
  });

  describe('@Input(variant)', () => {
    it('should by default have value `primary`', async () => {
      const host = await createComponent();
      expect(host.component.variant).toBe('primary');
    });

    it('should bind to `nzType` of <button>', async () => {
      const host = await createComponent({ variant: 'value' as any }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzType).toBe('value');
    });

    it('should bind `primary` as `primary`', async () => {
      const host = await createComponent({ variant: 'primary' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzType).toBe('primary');
    });

    it('should bind `secondary` as `default`', async () => {
      const host = await createComponent({ variant: 'secondary' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzType).toBe('default');
    });

    it('should bind `critical` as `danger`', async () => {
      const host = await createComponent({ variant: 'critical' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzType).toBe('danger');
    });

    it('should update binding when changed', async () => {
      const host = await createComponent({ variant: 'primary' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzType).toBe('primary');

      host.setInputs({ variant: 'critical' }, true);

      expect(buttonElem.properties.nzType).toBe('danger');
    });
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

  describe('@Input(shape)', () => {
    it('should by default have value `default`', async () => {
      const host = await createComponent();
      expect(host.component.shape).toBe('default');
    });

    it('should bind to `nzShape` of <button>', async () => {
      const host = await createComponent({ shape: 'value' as any }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzShape).toBe('value');
    });

    it('should bind `round` as `round`', async () => {
      const host = await createComponent({ shape: 'round' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzShape).toBe('round');
    });

    it('should bind `circle` as `circle`', async () => {
      const host = await createComponent({ shape: 'circle' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzShape).toBe('circle');
    });

    it('should bind `default` as `null`', async () => {
      const host = await createComponent({ shape: 'default' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzShape).toBe(null);
    });

    it('should update binding when changed', async () => {
      const host = await createComponent({ shape: 'round' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzShape).toBe('round');

      host.setInputs({ shape: 'circle' }, true);

      expect(buttonElem.properties.nzShape).toBe('circle');
    });
  });

  describe('@Input(size)', () => {
    it('should by default have value `md`', async () => {
      const host = await createComponent();
      expect(host.component.size).toBe('md');
    });

    it('should bind to `nzSize` of <button>', async () => {
      const host = await createComponent({ size: 'value' as any }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzSize).toBe('value');
    });

    it('should bind `lg` as `large`', async () => {
      const host = await createComponent({ size: 'lg' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzSize).toBe('large');
    });

    it('should bind `md` as `default`', async () => {
      const host = await createComponent({ size: 'md' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzSize).toBe('default');
    });

    it('should bind `sm` as `small`', async () => {
      const host = await createComponent({ size: 'sm' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzSize).toBe('small');
    });

    it('should update binding when changed', async () => {
      const host = await createComponent({ size: 'sm' }, true);
      const buttonElem = host.queryCss('button')!;

      expect(buttonElem.properties.nzSize).toBe('small');

      host.setInputs({ size: 'md' }, true);

      expect(buttonElem.properties.nzSize).toBe('default');
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
