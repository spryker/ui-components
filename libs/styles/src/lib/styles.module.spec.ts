import { async, TestBed } from '@angular/core/testing';
import { StylesModule } from './styles.module';

describe('StylesModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [StylesModule],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    it('should create', () => {
        expect(StylesModule).toBeDefined();
    });
});
