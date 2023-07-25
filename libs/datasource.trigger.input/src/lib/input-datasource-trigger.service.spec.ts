import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InputDatasourceTriggerService } from './input-datasource-trigger.service';

const mockValue = 'mockValue';
const mockConfig = {
    type: 'trigger',
    event: 'input',
    datasource: {
        type: 'test',
    },
};
const callback = jest.fn();

class MockInputDatasourceTrigger {
    subscribeToEvent = jest.fn();
}

describe('InputDatasourceTriggerService', () => {
    let service: MockInputDatasourceTrigger;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockInputDatasourceTrigger,
                {
                    provide: InputDatasourceTriggerService,
                    useExisting: MockInputDatasourceTrigger,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(MockInputDatasourceTrigger);
    });

    it('should return trigger element value from `subscribeToEvent()` method', () => {
        const triggerElement = document.createElement('input');

        service.subscribeToEvent.mockReturnValue(of(mockValue));

        const serviceObservable$ = service.subscribeToEvent(mockConfig, triggerElement);

        serviceObservable$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockValue);
    });
});
