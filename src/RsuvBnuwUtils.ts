import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';

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
