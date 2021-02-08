import { TestBed } from '@angular/core/testing';

import { InMemoryPersistenceStrategy } from './in-memory-persistence-strategy';

const mockKey = 'mockKey';
const mockValue = 'mockValue';

describe('InMemoryPersistenceStrategy', () => {
  let service: InMemoryPersistenceStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryPersistenceStrategy);
  });

  it('retrieve method when no value under key must return undefined', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(undefined);
  });

  it('retrieve method must return stored value under key from memory', () => {
    let data;
    service.save(mockKey, mockValue);
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(mockValue);
  });

  it('save method must store `value` under `key` in the memory', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(undefined);

    service.save(mockKey, mockValue);

    expect(data).toBe(mockValue);
  });

  it('remove method must remove stored `value` under `key` from memory', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(undefined);

    service.save(mockKey, mockValue);

    expect(data).toBe(mockValue);

    service.remove(mockKey);

    expect(data).toBe(undefined);
  });
});
