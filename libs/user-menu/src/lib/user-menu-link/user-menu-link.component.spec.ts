import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { UserMenuLinkComponent, UserMenuLinkType } from './user-menu-link.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'spy-test',
  template: 'test'
})
class MockTestComponent {
  togglePopover = jest.fn();
}

// tslint:disable no-non-null-assertion

describe('UserMenuLinkComponent', () => {
  let userMenuComponent: MockTestComponent;

  const { testModule, createComponent } = getTestingForComponent(
    UserMenuLinkComponent,
    {
      ngModule: { schemas: [NO_ERRORS_SCHEMA] },
      projectContent: 'Content',
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        {
          provide: UserMenuComponent,
          useExisting: MockTestComponent
        },
        MockTestComponent,
      ]
    });
    userMenuComponent = TestBed.inject(MockTestComponent);
  });

  it('should render <spy-user-menu-link>', async () => {
    const host = await createComponent({}, true);
    const userMenuItemElem = host.queryCss('spy-user-menu-link');

    expect(userMenuItemElem).toBeTruthy();
  });

  it('should render <spy-user-menu-link> with type input', async () => {
    const host = await createComponent({ type: UserMenuLinkType.Danger }, true);
    const userMenuLinkElem = host.queryCss('spy-user-menu-link');

    expect(userMenuLinkElem?.classes['spy-user-menu-link--danger']).toBe(true);
  });

  it('click event should call parent togglePopover() method', async () => {
    const host = await createComponent({}, true);
    const userMenuLinkElem = host.queryCss('spy-user-menu-link');
    userMenuLinkElem!.triggerEventHandler('click', null);

    expect(userMenuComponent.togglePopover).toHaveBeenCalledWith(false);
  });
});
