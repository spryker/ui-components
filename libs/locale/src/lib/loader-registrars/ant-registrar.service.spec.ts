/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AntRegistrarService } from './ant-registrar.service';

xdescribe('Service: AntRegistrar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AntRegistrarService],
    });
  });

  it('should ...', inject(
    [AntRegistrarService],
    (service: AntRegistrarService) => {
      expect(service).toBeTruthy();
    },
  ));
});
