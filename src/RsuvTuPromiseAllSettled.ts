/*
ПОНЯТИЯ:
-- [[asau55]], pResults - массив представляющий результат работы Promise.allSettled()
-- [[asau66]], pElem - отдельный элемент массива pResults
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

export class PElemAsau66 {
  status: EnStatusAsau56 = EnStatusAsau56.REJECTED
  reason?: string
  value?: any
}

/**
 * Утилиты для работы с Promise.allSettled()
 */
export class RsuvTuPromiseAllSettled {

  /**
   * Извлекает reason-ы "реджектнутых" промисов
   * @param pResults
   */
  static rejected(pResults: Array<PElemAsau66>): Array<Asau57> {
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
  static fulfilled(pResults: Array<PElemAsau66>): Array<any> {
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
  static isAllSuccess(pResults: Array<PElemAsau66>): boolean {
    return pResults.every(el => el.status === EnStatusAsau56.FULFILLED)
  }

  /**
   * Возвращает TRUE если *pElem (1) обладает статусом (2)
   * @param pElem
   * @param status
   */
  static pElemIs(pElem: PElemAsau66, status: EnStatusAsau56): boolean {
    return pElem.status === status
  }

  /**
   * Для каждого *pElem из (1) вызвает (2) если *pElem is fulfilled или (3) если *pElem is rejected, и результат (2)(3)
   * добавляет в итоговый массив
   * @param pResults (1) --
   * @param cbFulfilled (2) --
   * @param cbRejected (3) --
   */
  static handle<T, S>(
    pResults: Array<PElemAsau66>, cbFulfilled: (value: any) => T, cbRejected: (reason?: string) => S
  ): Array<T | S> {
    return pResults.map(elPElem => {
      if (this.pElemIs(elPElem, EnStatusAsau56.FULFILLED)) {
        return cbFulfilled(elPElem.value)
      } else {
        return cbRejected(elPElem.reason)
      }
    })
  }

}
