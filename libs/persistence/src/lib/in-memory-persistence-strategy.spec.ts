import { TestBed } from '@angular/core/testing';

import { InMemoryPersistenceStrategy } from './in-memory-persistence-strategy';

const mockKey = 'mockKey';
const mockValue = 'mockValue';

describe('InMemoryPersistenceStrategy', () => {
  let service: InMemoryPersistenceStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(InMemoryPersistenceStrategy);
  });

  it('retrieve method when no value under key must return undefined', () => {
    const callback = jest.fn();
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('retrieve method must return stored value under key from memory', () => {
    const callback = jest.fn();
    service.save(mockKey, mockValue);
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockValue);
  });

  it('save method must store `value` under `key` in the memory', () => {
    const callback = jest.fn();
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);

    service.save(mockKey, mockValue);

    expect(callback).toHaveBeenCalledWith(mockValue);
  });

  it('remove method must remove stored `value` under `key` from memory', () => {
    const callback = jest.fn();
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);

    service.save(mockKey, mockValue);

    expect(callback).toHaveBeenCalledWith(mockValue);

    service.remove(mockKey);

    expect(callback).toHaveBeenCalledWith(undefined);
  });
});
