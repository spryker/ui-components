/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocaleService } from './locale.service';

xdescribe('Service: Locale', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocaleService],
    });
  });

  it('should ...', inject([LocaleService], (service: LocaleService) => {
    expect(service).toBeTruthy();
  }));
});
