import { TestBed, inject } from '@angular/core/testing';
import { LocaleService } from './locale.service';

xdescribe('Service: Locale', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocaleService],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should ...', inject([LocaleService], (service: LocaleService) => {
        expect(service).toBeTruthy();
    }));
});
