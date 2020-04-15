/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgRegistrarService } from './ng-registrar.service';

xdescribe('Service: NgRegistrar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRegistrarService],
    });
  });

  it('should ...', inject(
    [NgRegistrarService],
    (service: NgRegistrarService) => {
      expect(service).toBeTruthy();
    },
  ));
});
