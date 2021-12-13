/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SprykerRegistrarService } from './spryker-registrar.service';

xdescribe('Service: SprykerRegistrar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprykerRegistrarService],
      teardown: { destroyAfterEach: false },
    });
  });

  it('should ...', inject(
    [SprykerRegistrarService],
    (service: SprykerRegistrarService) => {
      expect(service).toBeTruthy();
    },
  ));
});
