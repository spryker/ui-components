export function intersectionOfString(arr1: string[], arr2: string[]): string[] {
  const hashMap1: Record<string, boolean> = Object.create(null);
  const hashMap2: Record<string, boolean> = Object.create(null);
  const intersection: string[] = [];
  const length = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < length; i++) {
    if (arr1.length > i) {
      if (arr1[i] in hashMap2) {
        intersection.push(arr1[i]);
      } else {
        hashMap1[arr1[i]] = true;
      }
    }

    if (arr2.length > i) {
      if (arr2[i] in hashMap1) {
        intersection.push(arr2[i]);
      } else {
        hashMap2[arr2[i]] = true;
      }
    }
  }

  return intersection;
}

export function multipleIntersectionOfString(arr: string[][]): string[] {
  return arr
    .slice(1)
    .reduce(
      (intersection, value) => intersectionOfString(value, intersection),
      arr[0],
    );
}
