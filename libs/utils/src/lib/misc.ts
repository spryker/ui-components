export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function getPropByPath(value: any, path: string, delimiter = '.'): any {
  const paths = path.split(delimiter);

  while (value && paths.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    value = value[paths.shift()!];
  }

  return value;
}
