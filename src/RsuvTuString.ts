/*
утилиты для String
 */

import { RsuvTxString } from './RsuvTxString';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvResultTibo } from './RsuvResultTibo';
import _ from 'lodash';

/**
 * Возвращает TRUE если строка str это falsy, строка нулевой длины, или строка из одних пробелов
 *
 * source [210217114100]
 */
export function isEmptyOrWhitespaces(str: any): Boolean {
  return (!str || str.length === 0 || /^\s*$/.test(str))
}

/**
 * ID [[210713104651]] rev 1 1.0 2021-07-13
 * source ID [210518234642] rev 1 1.0 2021-05-18
 *
 * Возвращает сколько раз строка (2) встречается в строке (1).
 * Чувствительна к регистру.
 * Если не находит вхождений, и в невалидных случаях, возвращает 0.
 * @param target string (1) -- например 'aba'
 * @param substr string (2) -- например 'a'
 * @return number например 2
 */
export function substrCount(target: string, substr: string): number {
  if (target && substr) {
    const ret = target.split(substr).length - 1
    return ret >= 0 ? ret : 0;
  }
  return 0;
}

/**
 * ID [[210713104605]] rev 1 1.0.0 2021-07-13
 * source ID [210518234643] rev 1 1.0 2021-05-19
 *
 * {тоже что и А только не чувствительна к регистру}
 *
 * Возвращает сколько раз строка (2) встречается в строке (1).
 * Не чувствительна к регистру.
 * Если не находит вхождений, и в невалидных случаях, возвращает 0.
 * @param target string (1) -- например 'aba'
 * @param substr string (2) -- например 'A'
 * @return number например 2
 */
export function substrCountB(target: string, substr: string): number {
  if (target && substr) {
    const ret = target.toLowerCase().split(substr.toLowerCase()).length - 1
    return ret >= 0 ? ret : 0;
  }
  return 0;
}

/**
 * Возвращает информацию о том в каких местах строки (1) встречается строка (2).
 * Допускает содержание в (2) символов считающихся специальными для регулярных выражений - экранирует их.
 * ID [[210801094836]] rev 1 1.0.0 2021-08-01
 * @param target (1) --
 * @param substr (2) --
 * @param ignoreCase (3) -- TRUE если нужно игнорировать регистр символов
 * @return RsuvT7[] - пустой массив если вхождений не найдено и при нештатах
 */
export function substrIndexes(target: string, substr: string, ignoreCase: boolean): RsuvT7[] {
  const ret: RsuvT7[] = []
  if (!target || !substr
    || !_.isString(target) || !_.isString(substr)
    || target.length < 1 || substr.length < 1
    || target.length < substr.length) {
    return ret
  }
  const substrEscape = _.escapeRegExp(substr);
  const rg = new RegExp(substrEscape, 'g' + (ignoreCase ? 'i' : ''))
  let res: any = true;
  while (res) {
    res = rg.exec(target)
    if (res) {
      ret.push(new RsuvT7(res.index, res.index + substr.length))
    }
  }
  return ret
}

/**
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ей, имеет ли с ней полное соответствие. Вся эта информация проверяется для
 * двух вариантов - с учетом регистра и без учета регистра символов (этим отличается от версии А текущей функции)
 *
 * @param strTarget (1) --
 * @param strSub (2) --
 * @return RsuvResultTibo<RsuvT5>
 */
export function stringsTwoInfoB(strTarget: RsuvTxString, strSub: RsuvTxString): RsuvResultTibo<RsuvT5> {
  // --- verify
  const verif: RsuvResultBoolPknz = RsuvResultBoolPknz.successAllIsSugar([strTarget.bnuwIsValid(), strSub.bnuwIsValid()])
  if (!verif.success) {
    return RsuvResultTibo.fromPknz(verif)
  }
  // ---
  const strTargetRaw = strTarget.val
  const strSubRaw = strSub.val
  // ---
  const t5 = new RsuvT5()
  // ---
  if (strSubRaw.length > strTargetRaw.length) {
    return new RsuvResultTibo({success: true, value: t5}); // <=== RETURN
  }
  // --- --- без учета регистра
  const t4NoSens = new RsuvT4()
  // --- full match
  if (strTargetRaw.length === strSubRaw.length && strTargetRaw.toLowerCase() === strSubRaw.toLowerCase()) {
    t4NoSens.rsuvT3.push(RSUV_T3.COMPLETE_MATCH)
    t4NoSens.rsuvT3.push(RSUV_T3.STARTED)
    t4NoSens.rsuvT3.push(RSUV_T3.ENDED)
    t4NoSens.rsuvT3.push(RSUV_T3.CONTAINS)
    t4NoSens.containsCount = 1
    // ---
    t4NoSens.containsIndexes.push(new RsuvT7(0, strSubRaw.length))
  } else {
    const indexes = substrIndexes(strTargetRaw, strSubRaw, true)
    t4NoSens.containsIndexes = indexes
    // -- contains
    t4NoSens.containsCount = indexes.length
    if (t4NoSens.containsCount > 0) {
      t4NoSens.rsuvT3.push(RSUV_T3.CONTAINS)
    }
    // -- started
    if (strTargetRaw.substring(0, strSubRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
      t4NoSens.rsuvT3.push(RSUV_T3.STARTED)
    }
    // -- ended
    if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
      t4NoSens.rsuvT3.push(RSUV_T3.ENDED)
    }
  }
  // --- --- с учетом регистра
  const t4Sens = new RsuvT4()
  if (strTargetRaw.length === strSubRaw.length && strTargetRaw === strSubRaw) {
    t4Sens.rsuvT3.push(RSUV_T3.COMPLETE_MATCH)
    t4Sens.rsuvT3.push(RSUV_T3.STARTED)
    t4Sens.rsuvT3.push(RSUV_T3.ENDED)
    t4Sens.rsuvT3.push(RSUV_T3.CONTAINS)
    t4Sens.containsCount = 1
    t4Sens.containsIndexes.push(new RsuvT7(0, strSubRaw.length))
  } else {
    const indexes2 = substrIndexes(strTargetRaw, strSubRaw, false)
    t4Sens.containsIndexes = indexes2
    t4Sens.containsCount = indexes2.length
    if (t4Sens.containsCount > 0) {
      t4Sens.rsuvT3.push(RSUV_T3.CONTAINS)
    }
    // -- started
    if (strTargetRaw.substring(0, strSubRaw.length) === strSubRaw) {
      t4Sens.rsuvT3.push(RSUV_T3.STARTED)
    }
    // -- ended
    if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length) === strSubRaw) {
      t4Sens.rsuvT3.push(RSUV_T3.ENDED)
    }
  }
  // --- ---
  t5.sensitive = t4Sens
  t5.notSensitive = t4NoSens
  // ---
  return new RsuvResultTibo({success: true, value: t5})
}

/**
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ей, имеет ли с ней полное соответствие, на каких индексах начинается и
 * заканчивается подстрока (2) в строке (1). Вся эта информация проверяется для
 * двух варинатов - с учетом регистра и без учета регистра символов (3)
 * ID [[210801103621]] rev 1 1.0.0 2021-08-01
 * @param strTarget (1) --
 * @param strSub (2) --
 * @param ignoreCase (3) -- TRUE если нужно игнорировать регистр символов
 * @return RsuvResultTibo<RsuvT4>
 */
export function stringsTwoInfo(strTarget: RsuvTxString, strSub: RsuvTxString, ignoreCase: boolean = true): RsuvResultTibo<RsuvT4> {
  // --- verify
  const verif: RsuvResultBoolPknz = RsuvResultBoolPknz.successAllIsSugar([strTarget.bnuwIsValid(), strSub.bnuwIsValid()])
  if (!verif.success) {
    return RsuvResultTibo.fromPknz(verif)
  }
  // ---
  const strTargetRaw = strTarget.val
  const strSubRaw = strSub.val
  // ---
  let t4 = new RsuvT4();
  if (strSubRaw.length > strTargetRaw.length) {
    return new RsuvResultTibo({success: true, value: t4}); // <=== RETURN
  }
  // --- --- без учета регистра
  if (ignoreCase) {
    // --- full match
    if (strTargetRaw.length === strSubRaw.length && strTargetRaw.toLowerCase() === strSubRaw.toLowerCase()) {
      t4.rsuvT3.push(RSUV_T3.COMPLETE_MATCH)
      t4.rsuvT3.push(RSUV_T3.STARTED)
      t4.rsuvT3.push(RSUV_T3.ENDED)
      t4.rsuvT3.push(RSUV_T3.CONTAINS)
      t4.containsCount = 1
      // ---
      t4.containsIndexes.push(new RsuvT7(0, strSubRaw.length))
    } else {
      const indexes = substrIndexes(strTargetRaw, strSubRaw, true)
      t4.containsIndexes = indexes
      // -- contains
      t4.containsCount = indexes.length
      if (t4.containsCount > 0) {
        t4.rsuvT3.push(RSUV_T3.CONTAINS)
      }
      // -- started
      if (strTargetRaw.substring(0, strSubRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
        t4.rsuvT3.push(RSUV_T3.STARTED)
      }
      // -- ended
      if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length).toLowerCase() === strSubRaw.toLowerCase()) {
        t4.rsuvT3.push(RSUV_T3.ENDED)
      }
    }
  } else {
    // --- --- с учетом регистра
    if (strTargetRaw.length === strSubRaw.length && strTargetRaw === strSubRaw) {
      t4.rsuvT3.push(RSUV_T3.COMPLETE_MATCH)
      t4.rsuvT3.push(RSUV_T3.STARTED)
      t4.rsuvT3.push(RSUV_T3.ENDED)
      t4.rsuvT3.push(RSUV_T3.CONTAINS)
      t4.containsCount = 1
      t4.containsIndexes.push(new RsuvT7(0, strSubRaw.length))
    } else {
      const indexes2 = substrIndexes(strTargetRaw, strSubRaw, false)
      t4.containsIndexes = indexes2
      t4.containsCount = indexes2.length
      if (t4.containsCount > 0) {
        t4.rsuvT3.push(RSUV_T3.CONTAINS)
      }
      // -- started
      if (strTargetRaw.substring(0, strSubRaw.length) === strSubRaw) {
        t4.rsuvT3.push(RSUV_T3.STARTED)
      }
      // -- ended
      if (strTargetRaw.substring(strTargetRaw.length - strSubRaw.length, strTargetRaw.length) === strSubRaw) {
        t4.rsuvT3.push(RSUV_T3.ENDED)
      }
    }
  }
  // ---
  return new RsuvResultTibo({success: true, value: t4})
}

/**
 * [[asau24]]
 * СМ. ТАКЖЕ: [asau22]
 */
export enum RSUV_T3 {
  // target начинается с sub
  STARTED = 'rsuv_t3_started',
  // target заканчивается на sub
  ENDED = 'rsuv_t3_ended',
  // target содержит sub
  CONTAINS = 'rsuv_t3_contains',
  // target полностью совпадает с sub
  COMPLETE_MATCH = 'rsuv_t3_complete_match'
}

/**
 * Учёт регистра символов
 */
export enum RSUV_T6_CASE {
  SENSITIVE = 'rsuv_t6_case_sensitive',
  NOT_SENSITIVE = 'rsuv_t6_not_case_sensitive'
}

export class RsuvT4 {
  // сколько раз sub встречается в target
  containsCount: number = 0
  containsIndexes: RsuvT7[] = []
  rsuvT3: RSUV_T3[] = []
}

export class RsuvT5 {
  // информация для варианта "чувствительно к регистру"
  sensitive: RsuvT4 = new RsuvT4()
  // информация для варианта "НЕ чувствительно к регистру"
  notSensitive: RsuvT4 = new RsuvT4()
}

export class RsuvT7 {
  constructor(public startIndex: number = 0, public endIndex: number = 0) {
  }
}
