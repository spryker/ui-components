import { TestBed } from '@angular/core/testing';

import { AjaxActionService } from './ajax-action.service';

describe('AjaxActionService', () => {
  let service: AjaxActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
