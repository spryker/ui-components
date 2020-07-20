import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { PopoverComponent, PopoverPosition } from '@spryker/popover';

// tslint:disable: no-non-null-assertion

describe('PopoverComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    PopoverComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('should render <spy-popover>', async () => {
    const host = await createComponent();
    host.detectChanges();
    const popoverElem = host.queryCss('span[nz-popover]');
    expect(popoverElem).toBeTruthy();
  });

  it('should render opened <spy-popover>', async () => {
    const host = await createComponent({ open: true });
    host.detectChanges();
    const popoverElem = host.queryCss('span[nz-popover]');
    expect(popoverElem?.properties.nzPopoverVisible).toBeTruthy();
  });

  it('should render <spy-popover> with changed position', async () => {
    const host = await createComponent({ position: PopoverPosition.Top });
    host.detectChanges();
    const popoverElem = host.queryCss('span[nz-popover]');
    expect(popoverElem?.properties.nzPopoverPlacement).toBe(
      PopoverPosition.Top,
    );
  });
});
