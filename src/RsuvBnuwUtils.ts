import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';

/**
 * Вызывает (1) и возвращает его результат если не было брошено исключения внутри (1), иначе возвращает null
 * @param fn (1) --
 */
export function bnuwFactory<T extends RsuvBnuwNT>(fn: () => T): T | null {
  try {
    return fn()
  } catch (err) {
    return null
  }
}

/**
 * Выполняет [bnuw]-проверку сущности (1) и если результат неуспешен то брасает исключение с результатом этой проверки
 * @param obj
 */
export function bnuwUtilsThrowIf(obj: RsuvBnuwNT) {
  const validRes = obj.bnuwIsValid()
  if (!validRes.success) {
    throw validRes
  }
}

/**
 * Проверяет значение (1)
 * @param value (1) --
 */
export const bnuwUtilsVerify = (value: RsuvBnuwNT | any): RsuvResultBoolPknz => {
  if (!value) {
    return new RsuvResultBoolPknz(false, '[[210711215605]]', 'value is falsy')
  }
  const res = (value as RsuvBnuwNT).bnuwIsValid();
  if (!res) {
    return new RsuvResultBoolPknz(false, '[[210711215805]]', 'invalid value')
  }
  return res;
}

/**
 * Если возвращает пустой массив, значит все элементы (1) валидные, иначе в массиве результы неудачных проверок
 * @param values (1) -- элементы для проверки; пустой массив не валиден
 */
export const bnuwUtilsVerifyMulti = (values: any[]): RsuvResultBoolPknz[] => {
  if (Array.isArray(values) && values.length > 0) {
    const ret: RsuvResultBoolPknz[] = [];
    values.forEach((el) => {
      const verif = bnuwUtilsVerify(el)
      if (!verif.success) {
        ret.push(verif)
      }
    })
    return ret;
  }
  return [new RsuvResultBoolPknz(false, '[[210711221552]]')]
}
