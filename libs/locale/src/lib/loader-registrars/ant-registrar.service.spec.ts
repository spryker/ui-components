import { TestBed, inject } from '@angular/core/testing';
import { AntRegistrarService } from './ant-registrar.service';

xdescribe('Service: AntRegistrar', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AntRegistrarService],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should ...', inject([AntRegistrarService], (service: AntRegistrarService) => {
        expect(service).toBeTruthy();
    }));
});
