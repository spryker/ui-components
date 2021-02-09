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
  removeEventListener = jest.fn();
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
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockKey);

    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(undefined);
  });

  it('retrieve method must return stored value under key from URL Query', () => {
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockSearchKey);
    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(mockSearchValue);
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
    let data;
    const retrievedSavedObserver$ = service.retrieve(mockSearchKey);
    retrievedSavedObserver$.subscribe((value) => {
      data = value;
    });

    expect(data).toBe(mockSearchValue);

    const newMockValue = `NEW${mockSearchValue}`;
    const newMockSearch = `?${mockSearchKey}="${newMockValue}"`;

    windowToken.location.search = newMockSearch;
    windowToken.popCallback?.({});

    expect(data).toBe(newMockValue);
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
