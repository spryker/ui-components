import { TestBed } from '@angular/core/testing';
import { WindowToken } from '@spryker/utils';

import { LocalStoragePersistenceStrategy } from './local-storage-persistence-strategy';

const mockKey = 'mockKey';
const mockValue = 'mockValue';

class MockWindowToken {
  localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
}

describe('LocalStoragePersistenceStrategy', () => {
  let service: LocalStoragePersistenceStrategy;
  let windowToken: MockWindowToken;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockWindowToken,
        {
          provide: WindowToken,
          useExisting: MockWindowToken,
        },
      ],
    });
    service = TestBed.inject(LocalStoragePersistenceStrategy);
    windowToken = TestBed.inject(MockWindowToken);
  });

  it('retrieve method when no value under key must return undefined', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(windowToken.localStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(data).toBe(undefined);
  });

  it('retrieve method must return stored value under key from localStorage', () => {
    let data;
    service.save(mockKey, mockValue);
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(windowToken.localStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(data).toBe(mockValue);
  });

  it('save method must store `value` under `key` in the memory and store it to the localStorage', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(undefined);

    service.save(mockKey, mockValue);

    expect(windowToken.localStorage.setItem).toHaveBeenCalledWith(
      mockKey,
      JSON.stringify(mockValue),
    );
    expect(data).toBe(mockValue);
  });

  it('remove method must remove stored `value` under `key` from LocalStorage', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(undefined);

    service.save(mockKey, mockValue);

    expect(data).toBe(mockValue);

    service.remove(mockKey);

    expect(windowToken.localStorage.removeItem).toHaveBeenCalledWith(mockKey);
    expect(data).toBe(undefined);
  });
});
