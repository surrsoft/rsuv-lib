/**
 * Представляет какую-либо ошибку
 */
export class RsuvErr {
  constructor(readonly code: string = '', readonly message: string = '') {
  }

  asString(): string {
    return `code [${this.code}] message [${this.message}]`
  }
}
