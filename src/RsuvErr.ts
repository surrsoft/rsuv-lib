/**
 * Представляет какую-либо ошибку
 */
export class RsuvErr {
  constructor(readonly code: string = '', readonly message: string = '') {
  }

  asString(): string {
    return `code [${this.code}] message [${this.message}]`
  }

  static asStringB(oj: RsuvErr): string {
    return `code [${oj.code}] message [${oj.message}]`
  }
}
