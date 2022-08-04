import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DateService } from '../date/date.service';
import { DateAdapter } from '../date/types';
import { InvalidTimeDuration } from './invalid-time-duration';
import { TimeDuration } from './time-duration';
import { TimeDurationService } from './time-duration.service';
import { TimeDurationData } from './types';

@Injectable({
  providedIn: 'root',
})
class MockDateService implements DateAdapter {
  add = {
    years: jest.fn(),
    months: jest.fn(),
    days: jest.fn(),
    hours: jest.fn(),
    minutes: jest.fn(),
    seconds: jest.fn(),
    milliseconds: jest.fn(),
  };
  sub = {
    years: jest.fn(),
    months: jest.fn(),
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
  let mockDateService: MockDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DateService,
          useExisting: MockDateService,
        },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(TimeDurationService);
    mockDateService = TestBed.inject(MockDateService);
  });

  it('parse method must return instance of TimeDuration with parsed duration component numbers and DateService if interval prop valid', () => {
    let mockValidDateString = '2h 30min';
    let mockValidData: TimeDurationData = { hours: 2, minutes: 30 };

    let returnedInstance = service.parse(mockValidDateString);
    let expectedInstance = new TimeDuration(mockValidData, mockDateService);

    expect(returnedInstance).toBeInstanceOf(TimeDuration);
    expect(returnedInstance).toMatchObject(expectedInstance);

    mockValidDateString = '1d 14h';
    mockValidData = { days: 1, hours: 14 };

    returnedInstance = service.parse(mockValidDateString);
    expectedInstance = new TimeDuration(mockValidData, mockDateService);

    expect(returnedInstance).toBeInstanceOf(TimeDuration);
    expect(returnedInstance).toMatchObject(expectedInstance);

    mockValidDateString = '2y 0d 20s';
    mockValidData = { years: 2, seconds: 20 };

    returnedInstance = service.parse(mockValidDateString);
    expectedInstance = new TimeDuration(mockValidData, mockDateService);

    expect(returnedInstance).toBeInstanceOf(TimeDuration);
    expect(returnedInstance).toMatchObject(expectedInstance);
  });

  it('parse method must return instance of InvalidTimeDuration if interval prop invalid', () => {
    const mockInvalidDateStrings = ['30min 2h', '60min', '2h 70ms'];
    const mockInvalidData: TimeDurationData = {};
    const expectedInstance = new InvalidTimeDuration(
      mockInvalidData,
      mockDateService,
    );

    mockInvalidDateStrings.forEach((interval) => {
      const returnedInstance = service.parse(interval);

      expect(returnedInstance).toBeInstanceOf(InvalidTimeDuration);
      expect(returnedInstance).toMatchObject(expectedInstance);
    });
  });
});
