export {};

Array.prototype.any = function <T>(predicate?: (value: T) => boolean) {
  if (predicate === undefined) {
    if (this.length > 0) {
      return true;
    }
    return false;
  }
  return this.some(predicate);
};

Array.prototype.all = function <T>(predicate?: (value: T) => boolean) {
  if (predicate === undefined) {
    return false;
  }
  return this.every(predicate);
};

Array.prototype.Find = function <T>(predicate: (value: T) => boolean) {
  this.forEach((element) => {
    if (predicate(element)) {
      return element;
    }
  });
  return;
};

Array.prototype.findLast = function <T>(predicate: (value: T) => boolean) {
  let result;
  this.forEach((element) => {
    if (predicate(element)) {
      result = element;
    }
  });
  return result;
};

Array.prototype.chunked = function (chunkSize: number) {
  let chunksCount = this.length / chunkSize;
  if (this.length % chunkSize != 0) {
    chunksCount = Math.floor(chunksCount) + 1;
  }
  const result = [];
  for (let i = 0; i < this.length; i += chunkSize) {
    const chunk = this.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};

Array.prototype.average = function () {
  let sum = 0;
  this.forEach((element) => {
    sum += element;
  });
  return sum / this.length;
};

Array.prototype.filterIndexed = function <T>(
  predicate: (index: number, value: T) => boolean
) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (predicate(i, this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.filterNot = function <T>(predicate: (value: T) => boolean) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (!predicate(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.maxBy = function <T>(selector: (type: T) => number) {
  let max = Number.MIN_VALUE;
  let result = null;
  this.forEach((element) => {
    if (selector(element) > max) {
      max = selector(element);
      result = element;
    }
  });
  return result;
};

Array.prototype.minBy = function <T>(selector: (type: T) => number) {
  let min = Number.MAX_VALUE;
  let result = null;
  this.forEach((element) => {
    if (selector(element) < min) {
      min = selector(element);
      result = element;
    }
  });
  return result;
};

Array.prototype.fold = function (
  initialValue: string | number,
  operation: (value: string | number) => string | number
) {
  let result: string | number = initialValue;
  this.forEach((element) => {
    result += operation(element) as string;
  });
  return result;
};

Array.prototype.associateBy = function <K, V>(
  keySelector: (key: K) => V
): Map<K, V> {
  const result = new Map();
  this.forEach((element) => {
    result.set(keySelector(element), element);
  });
  return result;
};

Array.prototype.groupBy = function <T, K, V>(
  keySelector: (key: T) => K,
  transform?: (value: T) => V
) {
  const result = new Map();
  if (transform == undefined) {
    for (let i = 0; i < this.length; i++) {
      const group = result.get(keySelector(this[i]));
      if (!group) {
        result.set(keySelector(this[i]), [this[i]]);
      } else {
        group.push(this[i]);
      }
    }
    return result;
  }
  for (let i = 0; i < this.length; i++) {
    const group = result.get(keySelector(this[i]));
    if (!group) {
      result.set(keySelector(this[i]), [transform(this[i])]);
    } else {
      group.push(transform(this[i]));
    }
  }
  return result;
};

Array.prototype.count = function <T>(predicate?: (value: T) => boolean) {
  let count = 0;
  if (predicate == undefined) {
    return this.length;
  }
  this.forEach((element) => {
    if (predicate(element)) {
      count++;
    }
  });
  return count;
};

Array.prototype.flatten = function <T>() {
  let result: T[] = [];
  this.forEach((element) => {
    if (Array.isArray(element)) {
      result = result.concat(element.flatten());
    } else {
      result.push(element);
    }
  });
  return result;
};

Array.prototype.distinctBy = function <T>(selector: (key: T) => T) {
  const result: T[] = [];
  this.forEach((element) => {
    if (selector(element)) {
      const a = result.find((item) => selector(item) == selector(element));
      if (!a) {
        result.push(element);
      }
    }
  });
  return result;
};
