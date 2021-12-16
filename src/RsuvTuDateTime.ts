import dayjs from 'dayjs';
import _ from 'lodash';

/*
ПОНЯТИЯ:
-- [yata] - {number} милисекунды с 01.01.1970
-- [eavv] - {number} секунды с 01.01.1970
-- [necz] - {string} [yata] в виде строки
-- [tafb] - {string} [eavv] в виде строки
-- [rvuo] - {string} формат YYYY-MM-DDTHH:mm, например '2021-12-12T12:04'
 */

export enum DATETIME {
  YATA = 'yata',
  NECZ = 'necz',
  RVUO = 'rvuo'
}

export class ResultAsau36<T> {
  constructor(public success: boolean, public value: T, public code: number) {
  }
}

// export function convert(from: DATETIME, to: DATETIME, fromVal: any): ResultAsau36<any> {
//   if (!from) {
//     return new ResultAsau36(false, null, 1)
//   }
//   if (!to) {
//     return new ResultAsau36(false, null, 2)
//   }
//   if (!fromVal) {
//     return new ResultAsau36(false, null, 3)
//   }
//
// }

/**
 * Преобразование формата [yata] (1) в формат [rvuo].
 * @param yata {number} (1) -- [yata], например 1637347161129
 * @return null если (1) не finite-число
 */
export function rvuoFromYata(yata: number | any): string | null {
  if (!yataIs(yata)) {
    return null
  }
  return dayjs(yata).format('YYYY-MM-DDTHH:mm');
}

export function yataFromRvuo(rvuo: string | any): ResultAsau36<number> {
  if (!_.isString(rvuo)) {
    return new ResultAsau36<number>(false, 0, 2)
  }
  const necz = rvuoIs(rvuo)
  if (necz) {
    const yata = _.toInteger(necz)
    return new ResultAsau36<number>(true, yata, 0)
  }
  return new ResultAsau36<number>(false, 0, 1)
}

export function yataIs(yata: number | any): boolean {
  if (!_.isFinite(yata)) {
    return false;
  }
  return true;
}

export function yataFromEavv(eavv: number | any): ResultAsau36<number> {
  if (!eavvIs(eavv)) {
    return new ResultAsau36<number>(false, 0, 1)
  }
  const yata = eavv * 1000;
  return new ResultAsau36<number>(true, yata, 0)
}

/**
 * Возвращает {success: true, value: true, ...} если дата (1) не достигла даты (2) (т.е. меньше даты (2))
 * @param yata (1) -- [yata]
 * @param yataExpire (2) -- [yata]
 */
export function yataIsActual(yata: number | any, yataExpire: number | any): ResultAsau36<boolean> {
  if (!yataIs(yata)) {
    return new ResultAsau36<boolean>(false, false, 1)
  }
  if (!yataIs(yataExpire)) {
    return new ResultAsau36<boolean>(false, false, 2)
  }
  if (yata > yataExpire) {
    return new ResultAsau36<boolean>(true, false, 0)
  }
  return new ResultAsau36<boolean>(true, true, 0)
}

export function eavvIs(eavv: number | any): boolean {
  if (!_.isFinite(eavv)) {
    return false;
  }
  return true;
}

/**
 * Возвращает [necz] ([yata] как строка) от (1) если (1) это валидный [rvuo], иначе возвращает null
 * @param rvuo (1) -- [rvuo], например '2021-12-10T12:04'
 */
export function rvuoIs(rvuo: string | any): string | null {
  if (!_.isString(rvuo)) {
    return null
  }
  const ex = /^(\d\d\d\d+)-(\d\d)-(\d\d)T(\d\d):(\d\d)$/.exec(rvuo)
  if (ex) {
    const month = Number(ex[2])
    const day = Number(ex[3])
    const hour = Number(ex[4])
    const minute = Number(ex[5])
    if (month < 1 || month > 12) {
      return null
    }
    if (day < 1 || day > 31) {
      return null
    }
    if (hour < 0 && hour > 24) {
      return null
    }
    if (minute < 0 && minute > 59) {
      return null
    }
  }
  // ---
  const day = dayjs(rvuo)
  const yata = day.toDate().getTime()
  if (!_.isFinite(yata)) {
    return null;
  }
  return yata + '';
}
