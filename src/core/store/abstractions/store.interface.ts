export interface IStore<T, V> {
  get(key: T): V;
  set(key: T, value: V): void;
}
