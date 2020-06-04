import { TestBed } from '@angular/core/testing';

import { AjaxPostActionRedirectService } from './ajax-post-action-redirect.service';

describe('AjaxPostActionRedirectService', () => {
  let service: AjaxPostActionRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxPostActionRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
