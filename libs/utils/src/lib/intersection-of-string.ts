export function intersectionOfString(
  arr1: string[],
  arr2: string[],
): Record<string, boolean> {
  const hashMap1: Record<string, boolean> = Object.create(null);
  const hashMap2: Record<string, boolean> = Object.create(null);
  const intersection: Record<string, boolean> = Object.create(null);
  const length = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < length; i++) {
    if (arr1.length > i) {
      if (arr1[i] in hashMap2) {
        intersection[arr1[i]] = true;
      } else {
        hashMap1[arr1[i]] = true;
      }
    }

    if (arr2.length > i) {
      if (arr2[i] in hashMap1) {
        intersection[arr2[i]] = true;
      } else {
        hashMap2[arr2[i]] = true;
      }
    }
  }

  return intersection;
}

export function multipleIntersectionOfString(
  arr: string[][],
): Record<string, boolean> {
  const startedPoint: Record<string, boolean> = Object.create(null);

  for (let i = 0; i < arr[0].length; i++) {
    startedPoint[arr[0][i]] = true;
  }

  return arr
    .slice(1)
    .reduce(
      (intersection, value) =>
        intersectionOfString(value, Object.keys(intersection)),
      startedPoint,
    );
}
