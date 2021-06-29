import { TestBed } from '@angular/core/testing';

import { RefreshDrawerActionHandlerService } from './refresh-drawer-action-handler.service';

describe('RefreshDrawerActionHandlerService', () => {
  let service: RefreshDrawerActionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshDrawerActionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
