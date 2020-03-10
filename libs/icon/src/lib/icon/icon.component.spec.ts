// tslint:disable: no-non-null-assertion
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { IconComponent } from './icon.component';
import { IconService, provideIcons } from './icon.component.service';

const promiseIcon = 'home';
const stringIcon = 'string';

const svgIcon = `<svg viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" class=""></path></svg>`;

describe('IconComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    IconComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        IconService,
        provideIcons([
          {
            name: promiseIcon,
            svg: () => Promise.resolve(svgIcon),
          },
          {
            name: stringIcon,
            svg: svgIcon,
          },
        ]),
      ],
    });
  });

  it('should compile', async () => {
    await createComponent();
  });

  describe('@Input(name)', () => {
    it('should render <i> from promise', async () => {
      const host = await createComponent({ name: promiseIcon }, true);

      const iconElem = host.queryCss('i');

      expect(iconElem).toBeTruthy();
      expect(iconElem!.properties.nzType).toEqual(promiseIcon);
    });

    it('should render <i> from string', async () => {
      const host = await createComponent({ name: stringIcon }, true);

      const iconComponent = host.queryCss('i');

      expect(iconComponent).toBeTruthy();
      expect(iconComponent!.properties.nzType).toEqual(stringIcon);
    });

    it('should re-render <i> when changed', fakeAsync(async () => {
      const host = await createComponent({ name: promiseIcon }, true);

      const firstIconElem = host.queryCss('i');

      expect(firstIconElem).toBeTruthy();
      expect(firstIconElem!.properties.nzType).toEqual(promiseIcon);

      host.setInputs({ name: stringIcon }, true);
      tick();

      const secondIconElem = host.queryCss('i');

      expect(secondIconElem).toBeTruthy();
      expect(secondIconElem!.properties.nzType).toEqual(stringIcon);
    }));
  });
});
