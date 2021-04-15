/**
 * Представляет какую-либо ошибку
 */
export class RsuvErr {
  constructor(readonly code: string = '', readonly message: string = '') {}
}
