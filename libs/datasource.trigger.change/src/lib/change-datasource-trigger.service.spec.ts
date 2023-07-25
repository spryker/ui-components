import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChangeDatasourceTriggerService } from './change-datasource-trigger.service';

const mockValue = 'mockValue';
const mockConfig = {
    type: 'trigger',
    event: 'change',
    datasource: {
        type: 'test',
    },
};
const callback = jest.fn();

class MockChangeDatasourceTrigger {
    subscribeToEvent = jest.fn();
}

describe('ChangeDatasourceTriggerService', () => {
    let service: MockChangeDatasourceTrigger;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockChangeDatasourceTrigger,
                {
                    provide: ChangeDatasourceTriggerService,
                    useExisting: MockChangeDatasourceTrigger
                }
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockChangeDatasourceTrigger);
    });

    it('should return trigger element value from `subscribeToEvent()` method', () => {
        const triggerElement = document.createElement('textarea');

        service.subscribeToEvent.mockReturnValue(of(mockValue));

        const serviceObservable$ = service.subscribeToEvent(mockConfig, triggerElement);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockValue);
    });
});
