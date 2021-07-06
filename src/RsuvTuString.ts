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
