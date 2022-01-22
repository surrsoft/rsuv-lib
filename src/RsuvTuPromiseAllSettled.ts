/*
ПОНЯТИЯ:
-- [[asau55]], pResults - массив представляющий результат работы Promise.allSettled()
 */

/**
 * [[asau56]]
 * Статусы Promise.allSettled()
 */
export enum EnStatusAsau56 {
  REJECTED = 'rejected',
  FULFILLED = 'fulfilled'
}

/**
 * Утилиты для работы с Promise.allSettled()
 */
export class RsuvTuPromiseAllSettled {

  /**
   * Извлекает reason-ы "реджектнутых" промисов
   * @param pResults
   */
  static rejected(pResults: Array<any>): Array<any> {
    const rejs = pResults.filter((el) => el.status === EnStatusAsau56.REJECTED)
    return rejs.map(el => el.reason)
  }

  /**
   * Извлекает value-ы успешных промисов
   * @param pResults
   */
  static fulfilled(pResults: Array<any>): Array<any> {
    const rejs = pResults.filter((el) => el.status === EnStatusAsau56.FULFILLED)
    return rejs.map(el => el.value)
  }

  /**
   * Возвращает TRUE если все результаты в (1) являются успешными
   * @param pResults
   */
  static isAllSuccess(pResults: Array<any>): boolean {
    return pResults.every(el => el.status === EnStatusAsau56.FULFILLED)
  }

}
