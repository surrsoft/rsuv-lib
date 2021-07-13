/*
утилиты для String
 */

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
  if(target && substr) {
    const ret =  target.split(substr).length - 1
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
