import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { UserMenuItemComponent } from './user-menu-item.component';

describe('UserMenuItemComponent', () => {
  const { testModule, createComponent } = getTestingForComponent(
    UserMenuItemComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [testModule],
      teardown: { destroyAfterEach: false },
    }),
  );

  it('should render <spy-user-menu-item> with default slot', async () => {
    const host = await createComponent({}, true);
    const userMenuItemElem = host.queryCss('spy-user-menu-item');

    expect(userMenuItemElem).toBeTruthy();
    expect(userMenuItemElem?.nativeElement.textContent).toMatch('Content');
  });
});
