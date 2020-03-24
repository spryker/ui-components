import { TestRequest } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

export type MaybeDeferred<T> = T | PromiseLike<T> | Observable<T>;

export type MockHttpValue<T = unknown> = MaybeDeferred<T>;

export type MockHttpResolver<T = unknown> = (
  request: TestRequest,
  injector: Injector,
) => MockHttpValue<T>;

export interface MockHttpOptions {
  delay?: number | 'random';
  maxDelay?: number;
  errorRate?: number;
}

export interface MockHttpResponse<D = unknown, E = unknown>
  extends MockHttpOptions {
  url: string | RegExp;
  method?: string;
  data?: MockHttpValue<D>;
  dataFn?: MockHttpResolver<D>;
  error?: MockHttpValue<E>;
  errorFn?: MockHttpResolver<E>;
}

export interface MatchedHttpRequest<D = unknown, E = unknown> {
  request: TestRequest;
  response: MockHttpResponse<D, E>;
}

export function isMatchedRequest(
  req: Partial<MatchedHttpRequest>,
): req is MatchedHttpRequest {
  return !!req.response;
}
