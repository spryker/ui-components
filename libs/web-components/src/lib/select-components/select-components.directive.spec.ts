import { TestBed, waitForAsync } from '@angular/core/testing';
import { SelectComponentsDirective } from './select-components.directive';

describe('Directive: SelectComponents', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SelectComponentsDirective],
            teardown: { destroyAfterEach: false },
        }).compileComponents();
    }));

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('should create an instance', () => {});
});
