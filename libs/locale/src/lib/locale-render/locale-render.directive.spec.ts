import { TestBed, waitForAsync } from '@angular/core/testing';
import { LocaleRenderDirective } from './locale-render.directive';

describe('Directive: LocaleRender', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LocaleRenderDirective],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('should create an instance', () => {});
});
