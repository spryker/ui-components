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
            teardown: { destroyAfterEach: false },
        });
        service = TestBed.inject(LocalStoragePersistenceStrategy);
        windowToken = TestBed.inject(MockWindowToken);
    });

    it('retrieve method when no value under key must return undefined', () => {
        const callback = jest.fn();
        const retrievedSavedObserver$ = service.retrieve(mockKey);

        retrievedSavedObserver$.subscribe(callback);

        expect(windowToken.localStorage.getItem).toHaveBeenCalledWith(mockKey);
        expect(callback).toHaveBeenCalledWith(undefined);
    });

    it('retrieve method must return stored value under key from localStorage', () => {
        const callback = jest.fn();
        service.save(mockKey, mockValue);
        const retrievedSavedObserver$ = service.retrieve(mockKey);

        retrievedSavedObserver$.subscribe(callback);

        expect(windowToken.localStorage.getItem).toHaveBeenCalledWith(mockKey);
        expect(callback).toHaveBeenCalledWith(mockValue);
    });

    it('save method must store `value` under `key` in the memory and store it to the localStorage', () => {
        const callback = jest.fn();
        const retrievedSavedObserver$ = service.retrieve(mockKey);

        retrievedSavedObserver$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);

        service.save(mockKey, mockValue);

        expect(windowToken.localStorage.setItem).toHaveBeenCalledWith(mockKey, JSON.stringify(mockValue));
        expect(callback).toHaveBeenCalledWith(mockValue);
    });

    it('remove method must remove stored `value` under `key` from LocalStorage', () => {
        const callback = jest.fn();
        const retrievedSavedObserver$ = service.retrieve(mockKey);

        retrievedSavedObserver$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(undefined);

        service.save(mockKey, mockValue);

        expect(callback).toHaveBeenCalledWith(mockValue);

        service.remove(mockKey);

        expect(windowToken.localStorage.removeItem).toHaveBeenCalledWith(mockKey);
        expect(callback).toHaveBeenCalledWith(undefined);
    });
});
