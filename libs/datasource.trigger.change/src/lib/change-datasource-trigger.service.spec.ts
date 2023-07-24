import { TestBed } from '@angular/core/testing';

import { ChangeDatasourceTriggerService } from './change-datasource-trigger.service';

describe('ChangeDatasourceTriggerService', () => {
    let service: ChangeDatasourceTriggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ChangeDatasourceTriggerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
