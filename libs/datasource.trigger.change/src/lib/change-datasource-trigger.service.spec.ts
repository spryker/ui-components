import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ChangeDatasourceTriggerService } from './change-datasource-trigger.service';

const mockConfig = {
    type: 'trigger',
    event: 'change',
    datasource: {
        type: 'test',
    },
};

describe('ChangeDatasourceTriggerService', () => {
    let service: ChangeDatasourceTriggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(ChangeDatasourceTriggerService);
    });

    it('should return trigger element value from `subscribeToEvent()` method', () => {
        const mockValue = 'mockValue';
        const triggerElement = document.createElement('select');
        const triggerElementOption = document.createElement('option');
        const callback = jest.fn();

        triggerElementOption.text = mockValue;
        triggerElementOption.value = mockValue;
        triggerElement.appendChild(triggerElementOption);

        const serviceObservable$ = service.subscribeToEvent(mockConfig, triggerElement);

        serviceObservable$.subscribe(callback);
        triggerElement.dispatchEvent(new Event(mockConfig.event));

        expect(callback).toHaveBeenCalledWith({ value: mockValue });
    });

    it('should return a value only if the length is at least `minCharacters` (`2` - by default)', () => {
        const mockValue = '1';
        const triggerElement = document.createElement('select');
        const triggerElementOption = document.createElement('option');
        const callback = jest.fn();

        triggerElementOption.text = mockValue;
        triggerElementOption.value = mockValue;
        triggerElement.appendChild(triggerElementOption);

        const serviceObservable$ = service.subscribeToEvent(mockConfig, triggerElement);

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
