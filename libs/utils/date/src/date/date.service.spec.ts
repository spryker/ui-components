import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DateModule } from './date.module';
import { DateService } from './date.service';
import { DateAdapter } from './types';

@Injectable({
  providedIn: 'root',
})
class MockDateAdapterService implements DateAdapter {
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

describe('DateService', () => {
  let service: DateService;
  let mockAdapter: MockDateAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateModule.withAdapter(MockDateAdapterService)],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(DateService);
    mockAdapter = TestBed.inject(MockDateAdapterService);
  });

  it('parse method must return result from DateAdapterToken call DateAdapter.parse() with argument date', () => {
    const mockDateProp = 'date';

    service.parse(mockDateProp);

    expect(mockAdapter.parse).toHaveBeenCalledWith(mockDateProp);
  });
});
