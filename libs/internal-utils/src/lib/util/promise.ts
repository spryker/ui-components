export function isPromise<T>(val: any): val is PromiseLike<T> {
  return (
    !!val &&
    typeof val === 'object' &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  );
}
