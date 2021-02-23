import { TestBed } from '@angular/core/testing';

import { DrawerActionHandlerService } from './refresh-drawer-action-handler.service';

describe('DrawerActionHandlerService', () => {
  let service: DrawerActionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerActionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
