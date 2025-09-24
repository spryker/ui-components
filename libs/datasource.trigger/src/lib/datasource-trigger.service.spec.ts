import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DatasourceService } from '@spryker/datasource';
import { EMPTY, of } from 'rxjs';
import { DatasourceTriggerService } from './datasource-trigger.service';
import { DatasourceTriggerModule } from './datasource-trigger.module';
import { DatasourceTriggerElement } from './types';

const mockTriggerEventType = 'testEvent';
const mockConfig = {
    type: 'trigger',
    event: mockTriggerEventType,
    debounce: 100,
    datasource: {
        type: 'test',
    },
};
const callback = jest.fn();
const mockTriggerElement = 'trigger';
const mockTriggerContext = { value: 'test' };
const mockResult = 'result';

class MockDatasourceTriggerElement {
    getTriggerElement = jest.fn();
}

class MockDatasourceTriggerEvent {
    subscribeToEvent = jest.fn();
}

class MockDatasourceService {
    resolve = jest.fn();
}

class MockInjector {
    get = jest.fn();
}

describe('DatasourceTriggerService', () => {
    let service: DatasourceTriggerService;
    let datasourceTriggerElement: MockDatasourceTriggerElement;
    let datasourceTriggerEvent: MockDatasourceTriggerEvent;
    let datasourceService: MockDatasourceService;
    let injector: MockInjector;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DatasourceTriggerModule.withEvents({
                    [mockTriggerEventType]: MockDatasourceTriggerEvent,
                }),
            ],
            providers: [
                MockDatasourceTriggerElement,
                MockDatasourceTriggerEvent,
                MockDatasourceService,
                MockInjector,
                {
                    provide: DatasourceTriggerElement,
                    useExisting: MockDatasourceTriggerElement,
                },
                {
                    provide: DatasourceService,
                    useExisting: MockDatasourceService,
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: false },
        });

        service = TestBed.inject(DatasourceTriggerService);
        datasourceTriggerElement = TestBed.inject(MockDatasourceTriggerElement);
        datasourceTriggerEvent = TestBed.inject(MockDatasourceTriggerEvent);
        datasourceService = TestBed.inject(MockDatasourceService);
        injector = TestBed.inject(MockInjector);

        injector.get.mockImplementation((instance) => {
            if (instance.toString() === DatasourceTriggerElement.toString()) {
                return datasourceTriggerElement;
            }

            if (instance.toString() === MockDatasourceTriggerEvent.toString()) {
                return datasourceTriggerEvent;
            }
        });
    });

    it('should return results of trigger subscription from the proper datasources', () => {
        datasourceTriggerElement.getTriggerElement.mockReturnValue(of(mockTriggerElement));
        datasourceTriggerEvent.subscribeToEvent.mockReturnValue(of(mockTriggerContext));
        datasourceService.resolve.mockReturnValue(of(mockResult));

        const serviceObservable$ = service.resolve(injector, mockConfig);

        serviceObservable$.subscribe(callback);

        expect(datasourceTriggerElement.getTriggerElement).toHaveBeenCalled();
        expect(datasourceTriggerEvent.subscribeToEvent).toHaveBeenCalledWith(mockConfig, mockTriggerElement);
        expect(datasourceService.resolve).toHaveBeenCalledWith(injector, mockConfig.datasource, mockTriggerContext);
        expect(callback).toHaveBeenCalledWith(mockResult);
    });

    it('should throw an error if `triggerElement$` does not exist', () => {
        expect(() => {
            service.resolve(injector, mockConfig);
        }).toThrow();
    });

    it('should throw an error if `config.event` type is not registered', () => {
        const mockConfigWithInvalidType = {
            type: 'trigger',
            event: 'invalid',
            datasource: {
                type: 'test',
            },
        };

        expect(() => {
            service.resolve(injector, mockConfigWithInvalidType);
        }).toThrow();
    });

    it('should not call `DatasourceTriggerEvent.subscribeToEvent()` if `triggerElement$` does not returns HTMLElement', () => {
        datasourceTriggerElement.getTriggerElement.mockReturnValue(of(null));
        service.resolve(injector, mockConfig);

        expect(datasourceTriggerEvent.subscribeToEvent).not.toHaveBeenCalled();
    });

    it('should not call `DatasourceService.resolve()` if `DatasourceTriggerEvent.subscribeToEvent()` returns an empty stream', () => {
        datasourceTriggerElement.getTriggerElement.mockReturnValue(of(mockTriggerElement));
        datasourceTriggerEvent.subscribeToEvent.mockReturnValue(EMPTY);
        service.resolve(injector, mockConfig);

        expect(datasourceService.resolve).not.toHaveBeenCalled();
    });
});
