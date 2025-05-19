import { waitForAsync, TestBed } from '@angular/core/testing';
import { LocaleModule } from './locale.module';

describe('LocaleModule', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LocaleModule],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    it('should create', () => {
        expect(LocaleModule).toBeDefined();
    });
});
