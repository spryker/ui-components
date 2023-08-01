import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputDatasourceTriggerService } from './input-datasource-trigger.service';

const mockConfig = {
    type: 'trigger',
    event: 'input',
    datasource: {
        type: 'test',
    },
};

describe('InputDatasourceTriggerService', () => {
    let service: InputDatasourceTriggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(InputDatasourceTriggerService);
    });

    it('should return trigger element value from `subscribeToEvent()` method', () => {
        const mockValue = 'mockValue';
        const triggerElement = document.createElement('input');
        const serviceObservable$ = service.subscribeToEvent(mockConfig, triggerElement);
        const callback = jest.fn();

        triggerElement.value = mockValue;
        serviceObservable$.subscribe(callback);
        triggerElement.dispatchEvent(new Event(mockConfig.event));

        expect(callback).toHaveBeenCalledWith({ value: mockValue });
    });

    it('should not return value if it`s length less then `minCharacters` (`2` - by default)', () => {
        const mockValue = '1';
        const triggerElement = document.createElement('input');
        const serviceObservable$ = service.subscribeToEvent(mockConfig, triggerElement);
        const callback = jest.fn();

        triggerElement.value = mockValue;
        serviceObservable$.subscribe(callback);
        triggerElement.dispatchEvent(new Event(mockConfig.event));

        expect(callback).not.toHaveBeenCalled();

        const updatedMockConfig = { ...mockConfig, minCharacters: 1 };
        const updatedServiceObservable$ = service.subscribeToEvent(updatedMockConfig, triggerElement);

        updatedServiceObservable$.subscribe(callback);
        triggerElement.dispatchEvent(new Event(mockConfig.event));

        expect(callback).toHaveBeenCalledWith({ value: mockValue });
    });
});
