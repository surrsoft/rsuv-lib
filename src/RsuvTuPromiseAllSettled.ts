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

export class Asau57 {
  ix: number = -1
  reason: any
}

/**
 * Утилиты для работы с Promise.allSettled()
 */
export class RsuvTuPromiseAllSettled {

  /**
   * Извлекает reason-ы "реджектнутых" промисов
   * @param pResults
   */
  static rejected(pResults: Array<any>): Array<Asau57> {
    const ret: Asau57[] = []
    pResults.forEach((el, ix) => {
      if (el.status === EnStatusAsau56.REJECTED) {
        ret.push({ix, reason: el.reason})
      }
    })
    return ret;
  }

  /**
   * Извлекает value-ы успешных промисов
   * @param pResults
   */
  static fulfilled(pResults: Array<any>): Array<any> {
    const ret: Asau57[] = []
    pResults.forEach((el, ix) => {
      if (el.status === EnStatusAsau56.FULFILLED) {
        ret.push({ix, reason: el.value})
      }
    })
    return ret;
  }

  /**
   * Возвращает TRUE если все результаты в (1) являются успешными
   * @param pResults
   */
  static isAllSuccess(pResults: Array<any>): boolean {
    return pResults.every(el => el.status === EnStatusAsau56.FULFILLED)
  }

}
