import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { ChipsComponent } from './chips.component';

// tslint:disable: no-non-null-assertion

describe('ButtonComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    ChipsComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => TestBed.configureTestingModule({ imports: [testModule] }));

  it('Input color should be bound to host element', async () => {
    const mockedColor = 'red';
    const host = await createComponent({ color: mockedColor });

    host.detectChanges();

    const chipsElem = host.queryCss('spy-chips');

    expect(chipsElem?.properties.className).toBe(mockedColor);
  });
});
