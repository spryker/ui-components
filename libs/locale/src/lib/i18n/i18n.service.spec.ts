import { TestBed, inject } from '@angular/core/testing';
import { I18nService } from './i18n.service';

xdescribe('Service: I18n', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [I18nService],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should ...', inject([I18nService], (service: I18nService) => {
        expect(service).toBeTruthy();
    }));
});
