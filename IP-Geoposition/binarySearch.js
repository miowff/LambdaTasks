export function binarySearch(array, item) {
  if (typeof item != "number") {
    return false;
  }
  let startIndex = 0;
  let lastIndex = array.length;
  let middleIndex;
  let isFound = false;
  while (!isFound && startIndex <= lastIndex) {
    middleIndex = Math.floor((startIndex + lastIndex) / 2);
    if (
      array[middleIndex].minIpIntValue <= item &&
      item <= array[middleIndex].maxIntIpValue
    ) {
      isFound = true;
      return array[middleIndex];
    }
    if (item < array[middleIndex].minIpIntValue) {
      lastIndex = middleIndex - 1;
    } else {
      startIndex = middleIndex + 1;
    }
  }
  return false;
}
