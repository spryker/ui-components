import { TestBed } from '@angular/core/testing';
import { WindowToken } from '@spryker/utils';

import { UrlPersistenceStrategy } from './url-persistence-strategy';

const mockKey = 'mockKey';
const mockValue = 'mockValue';
const mockSearchKey = 'mockSearchKey';
const mockSearchValue = 'mockSearchValue';

class MockWindowToken {
  popCallback?: (event: any) => void;

  location = {
    search: `?${mockSearchKey}="${mockSearchValue}"`,
    hash: 'hash',
    pathname: 'pathname',
  };
  history = {
    pushState: jest.fn(),
  };
  addEventListener = jest.fn().mockImplementation((name, callback) => {
    if (name === 'popstate') {
      this.popCallback = callback;
    }
  });
  removeEventListener = jest.fn().mockImplementation((name, callback) => {
    if (
      name === 'popstate' &&
      callback.toString() === this.popCallback?.toString()
    ) {
      this.popCallback = undefined;
    }
  });
}

describe('UrlPersistenceStrategy', () => {
  let service: UrlPersistenceStrategy;
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
    service = TestBed.inject(UrlPersistenceStrategy);
    windowToken = TestBed.inject(MockWindowToken);
  });

  const queryStringGeneration = (urlParams: URLSearchParams) =>
    `${windowToken.location.pathname}?${
      urlParams.toString() + `#${windowToken.location.hash}`
    }`;

  it('retrieve method when no value under key must return `undefined`', () => {
    const callback = jest.fn();
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('retrieve method must return stored value under key from URL Query', () => {
    const callback = jest.fn();
    const retrievedSavedObserver$ = service.retrieve(mockSearchKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockSearchValue);
  });

  it('save method must store `value` under `key` in the URL Query', () => {
    service.save(mockKey, mockValue);
    const urlParams = new URLSearchParams(windowToken.location.search);
    urlParams.set(mockKey, JSON.stringify(mockValue));

    expect(windowToken.history.pushState).toHaveBeenCalledWith(
      {},
      mockKey,
      queryStringGeneration(urlParams),
    );
  });

  it('retrieve method must emit stored value under key from URL Query every time when `popstate` event has been fired', () => {
    const callback = jest.fn();
    const retrievedSavedObserver$ = service.retrieve(mockSearchKey);

    retrievedSavedObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockSearchValue);

    const newMockValue = `NEW${mockSearchValue}`;
    const newMockSearch = `?${mockSearchKey}="${newMockValue}"`;

    windowToken.location.search = newMockSearch;
    windowToken.popCallback?.({});

    expect(callback).toHaveBeenCalledWith(newMockValue);
  });

  it('remove stored value under `key` from URL Query', () => {
    windowToken.location.search = `${mockKey}=22`;
    service.remove(mockKey);
    const urlParams = new URLSearchParams(windowToken.location.search);
    urlParams.delete(mockKey);

    expect(windowToken.history.pushState).toHaveBeenCalledWith(
      {},
      mockKey,
      queryStringGeneration(urlParams),
    );
  });
});
