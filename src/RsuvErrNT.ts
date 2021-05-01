export interface RsuvErrNT<T> {
  err(): T | undefined;

  errSet(err?: T): void;
}
