export {};
declare global {
  interface Array<T> {
    any(predicate: (value: T) => boolean): boolean;
    any(): boolean;
    all(predicate: (value: T) => boolean): boolean;
    associateBy<V>(this: Array<object>, keySelector: (key: T) => V): Map<T, V>;
    groupBy<V>(keySelector: (key: T) => V): Map<T, V[]>;
    groupBy<K, V>(
      keySelector: (key: T) => V,
      transform: (value: T) => K
    ): Map<T, V[]>;
    Find(predicate: (value: T) => boolean): T | null;
    findLast(predicate: (value: T) => boolean): T | null;
    chunked(chunkSize: number): T[][];
    average(this: Array<number>): number;
    filterIndexed(predicate: (index: number, value: T) => boolean): T[];
    filterNot(predicate: (value: T) => boolean): T[];
    maxBy(selector: (type: T) => number): T;
    minBy(selector: (type: T) => number): T;
    fold(
      this: Array<string | number>,
      initialValue: string | number,
      operation: (value: string | number) => string | number
    ): string | number;
    count(): number;
    count(predicate: (value: T) => boolean): number;
    flatten(this: Array<T>): T[];
    distinctBy<K>(selector: (type: T) => K): T[];
  }
}
