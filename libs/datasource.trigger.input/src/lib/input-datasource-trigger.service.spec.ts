import { TestBed } from '@angular/core/testing';

import { InputDatasourceTriggerService } from './input-datasource-trigger.service';

describe('InputDatasourceTriggerService', () => {
    let service: InputDatasourceTriggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InputDatasourceTriggerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
