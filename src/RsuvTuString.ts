/*
утилиты для String
 */

import { RsuvTxString } from './RsuvTxString';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvResultTibo } from './RsuvResultTibo';

/**
 * Возвращает TRUE если строка str это NULL, строка нулевой длины, или строка из одних пробелов
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
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ней, имеет ли с ней полное соответствие. Вся эта информация проверяется для
 * двух варинатов - с учетом регистра и без учета регистра символов
 *
 * @param strTarget (1) --
 * @param strSub (2) --
 * @return RsuvResultTibo<RsuvT5>
 */
export function stringsTwoInfo(strTarget: RsuvTxString, strSub: RsuvTxString): RsuvResultTibo<RsuvT5> {
  // --- verify
  const verif: RsuvResultBoolPknz = RsuvResultBoolPknz.successAllIsSugar([strTarget.bnuwIsValid(), strSub.bnuwIsValid()])
  if (!verif.success) {
    return RsuvResultTibo.fromPknz(verif)
  }
  // ---
  const strTarget0 = strTarget.val
  const strSub0 = strSub.val
  // ---
  const t5 = new RsuvT5()
  // ---
  if (strSub0.length > strTarget0.length) {
    return new RsuvResultTibo({success: true, value: t5}); // <=== RETURN
  }
  // --- --- без учета регистра
  const t4Case = new RsuvT4()
  // --- full match
  if (strTarget0.length === strSub0.length && strTarget0.toLowerCase() === strSub0.toLowerCase()) {
    t4Case.rsuvT3.push(RSUV_T3.COMPLETE_MATCH)
    t4Case.rsuvT3.push(RSUV_T3.STARTED)
    t4Case.rsuvT3.push(RSUV_T3.ENDED)
    t4Case.rsuvT3.push(RSUV_T3.CONTAINS)
    t4Case.containsCount = 1
  } else {
    // -- contains
    t4Case.containsCount = substrCountB(strTarget0, strSub0)
    if (t4Case.containsCount > 0) {
      t4Case.rsuvT3.push(RSUV_T3.CONTAINS)
    }
    // -- started
    if (strTarget0.substring(0, strSub0.length).toLowerCase() === strSub0.toLowerCase()) {
      t4Case.rsuvT3.push(RSUV_T3.STARTED)
    }
    // -- ended
    if (strTarget0.substring(strTarget0.length - strSub0.length, strTarget0.length).toLowerCase() === strSub0.toLowerCase()) {
      t4Case.rsuvT3.push(RSUV_T3.ENDED)
    }
  }
  // --- --- с учетом регистра
  const t4NoCase = new RsuvT4()
  if (strTarget0.length === strSub0.length && strTarget0 === strSub0) {
    t4NoCase.rsuvT3.push(RSUV_T3.COMPLETE_MATCH)
    t4NoCase.rsuvT3.push(RSUV_T3.STARTED)
    t4NoCase.rsuvT3.push(RSUV_T3.ENDED)
    t4NoCase.rsuvT3.push(RSUV_T3.CONTAINS)
    t4NoCase.containsCount = 1
  } else {
    t4NoCase.containsCount = substrCount(strTarget0, strSub0)
    if (t4NoCase.containsCount > 0) {
      t4NoCase.rsuvT3.push(RSUV_T3.CONTAINS)
    }
    // -- started
    if (strTarget0.substring(0, strSub0.length) === strSub0) {
      t4NoCase.rsuvT3.push(RSUV_T3.STARTED)
    }
    // -- ended
    if (strTarget0.substring(strTarget0.length - strSub0.length, strTarget0.length).toLowerCase() === strSub0.toLowerCase()) {
      t4NoCase.rsuvT3.push(RSUV_T3.ENDED)
    }
  }
  // --- ---
  t5.sensitive = t4NoCase
  t5.notSensitive = t4Case
  // ---
  return new RsuvResultTibo({success: true, value: t5})
}


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

class RsuvT4 {
  // сколько раз sub встречается в target
  containsCount: number = 0
  rsuvT3: RSUV_T3[] = []
}

export class RsuvT5 {
  // информация для варианта "чувствительно к регистру"
  sensitive: RsuvT4 = new RsuvT4()
  // информация для варианта "НЕ чувствительно к регистру"
  notSensitive: RsuvT4 = new RsuvT4()
}
