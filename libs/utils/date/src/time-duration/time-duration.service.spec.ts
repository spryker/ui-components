import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  DateOperations,
  DateService,
  TimeDurationData,
} from '@spryker/utils/date';

import { InvalidTimeDuration } from './invalid-time-duration';
import { TimeDuration } from './time-duration';
import { TimeDurationService } from './time-duration.service';

@Injectable({
  providedIn: 'root',
})
class MockDateServiceService implements DateOperations {
  add = {
    years: jest.fn(),
    days: jest.fn(),
    hours: jest.fn(),
    minutes: jest.fn(),
    seconds: jest.fn(),
    milliseconds: jest.fn(),
  };
  sub = {
    years: jest.fn(),
    days: jest.fn(),
    hours: jest.fn(),
    minutes: jest.fn(),
    seconds: jest.fn(),
    milliseconds: jest.fn(),
  };

  parse = jest.fn();
}

describe('TimeDurationService', () => {
  let service: TimeDurationService;
  let mockDateService: MockDateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DateService,
          useExisting: MockDateServiceService,
        },
      ],
    });
    service = TestBed.inject(TimeDurationService);
    mockDateService = TestBed.inject(MockDateServiceService);
  });

  it('parse method must return instance of TimeDuration with parsed duration component numbers and DateService if interval prop valid', () => {
    let mockValidDateString = '2h 30m';
    let mockValidData: TimeDurationData = { hours: 2, minutes: 30 };

    let returnedInstance = service.parse(mockValidDateString);
    let expectedInstance = new TimeDuration(
      mockValidData,
      (mockDateService as unknown) as DateService,
    );

    expect(returnedInstance).toMatchObject(expectedInstance);

    mockValidDateString = '1d 14h';
    mockValidData = { days: 1, hours: 14 };

    returnedInstance = service.parse(mockValidDateString);
    expectedInstance = new TimeDuration(
      mockValidData,
      (mockDateService as unknown) as DateService,
    );

    expect(returnedInstance).toMatchObject(expectedInstance);

    mockValidDateString = '2y 0d 20s';
    mockValidData = { years: 2, seconds: 20 };

    returnedInstance = service.parse(mockValidDateString);
    expectedInstance = new TimeDuration(
      mockValidData,
      (mockDateService as unknown) as DateService,
    );

    expect(returnedInstance).toMatchObject(expectedInstance);
  });

  it('parse method must return instance of InvalidTimeDuration if interval prop invalid', () => {
    const mockInvalidDateStrings = ['30m 2h', '60m', '2h 70ms'];
    const mockInvalidData: TimeDurationData = {};
    const expectedInstance = new InvalidTimeDuration(
      mockInvalidData,
      (mockDateService as unknown) as DateService,
    );

    mockInvalidDateStrings.forEach((interval) => {
      const returnedInstance = service.parse(interval);

      expect(returnedInstance).toMatchObject(expectedInstance);
    });
  });
});
