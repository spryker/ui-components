import { TestBed, inject } from '@angular/core/testing';
import { NgRegistrarService } from './ng-registrar.service';

xdescribe('Service: NgRegistrar', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgRegistrarService],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should ...', inject([NgRegistrarService], (service: NgRegistrarService) => {
        expect(service).toBeTruthy();
    }));
});
