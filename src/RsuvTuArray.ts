import _ from 'lodash';
import { RsuvResultAsau11 } from './RsuvResultAsau11';
import { RsuvResultTibo } from './RsuvResultTibo';

/**
 * Утилитные статические методы для работы с массивами
 */
export class RsuvTuArray {

  /**
   * Извлекает из массива (1) элементы с индекса (2) по индекс (3) (включая эти индексы), и возвращает их в виде нового
   * массива.
   * В случае проблем возвращает тип {@link RsuvResultAsau11}
   * @param arr (1) -- например ['aa', 'ab', 'ac', 'ad']
   * @param indexStart (2) -- например 1
   * @param indexEnd (3) -- например 2
   * @return например ['ab', 'ac']
   */
  static elemsDiap(arr: Array<any>, indexStart: number, indexEnd: number): RsuvResultTibo<any> {
    if (!RsuvTuArray.fnArrValidIs(arr)) return new RsuvResultTibo<any>({success: false, errCode: '1'})
    if (!RsuvTuArray.fnIndexValidIs(arr, indexStart)) return new RsuvResultTibo<any>({success: false, errCode: '2'})
    if (!RsuvTuArray.fnIndexValidIs(arr, indexEnd)) return new RsuvResultTibo<any>({success: false, errCode: '3'})
    if (indexEnd < indexStart) {
      return new RsuvResultTibo<any>({success: false, errCode: '4'})
    }
    if (indexEnd === indexStart) {
      return new RsuvResultTibo<any>({success: true, value: [arr[indexStart]], successCode: '100'})
    }
    return new RsuvResultTibo<any>({success: true, value: arr.slice(indexStart, indexEnd + 1), successCode: '101'})
  }

  /**
   * Удаляет элемент по индексу (2)
   * @param arrBack
   * @param index
   * @return RsuvResultAsau11
   */
  static elemDelete(arrBack: Array<any>, index: number): RsuvResultAsau11 {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1)
    if (!RsuvTuArray.fnIndexValidIs(arrBack, index)) return new RsuvResultAsau11(2)
    arrBack.splice(index, 1)
    return new RsuvResultAsau11(0, true)
  }

  /**
   * Добавляет элемент (3) по индексу (2), существующие элементы сдвигаются. Если нужно добавить в самый конец,
   * указать индекс (2) равный длине массива (1)
   * @param arrBack (1) -- массив, мутируется, например [1, 2, 3]
   * @param index (2) -- например 1
   * @param elem (3) -- например 's'
   * @return RsuvResultAsau11 ..., (1) например [1, 's',  2, 3]
   */
  static elemAdd(arrBack: Array<any>, index: number, elem: any): RsuvResultAsau11 {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1)
    if (!RsuvTuArray.fnIndexValidIsB(arrBack, index)) return new RsuvResultAsau11(2)
    arrBack.splice(index, 0, elem)
    return new RsuvResultAsau11(0, true)
  }

  /**
   * В массиве (1) перемещает элемент с индекса (2) на индекс (3)
   * @param arrBack {any[]} (1) -- массив, мутируется
   * @param indexFrom {number} (2) --
   * @param indexTo {number} (3) --
   * @return RsuvResultAsau11
   */
  static elemMove(arrBack: Array<any>, indexFrom: number, indexTo: number): RsuvResultAsau11 {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1)
    if (!RsuvTuArray.fnIndexValidIs(arrBack, indexFrom)) return new RsuvResultAsau11(2)
    if (!RsuvTuArray.fnIndexValidIs(arrBack, indexTo)) return new RsuvResultAsau11(3)
    if (indexFrom === indexTo) {
      return new RsuvResultAsau11(0, true)
    }
    // ---
    const el = arrBack.splice(indexFrom, 1)
    arrBack.splice(indexTo, 0, el[0])
    return new RsuvResultAsau11(0, true)
  }

  /**
   * Меняет местами элементы (2) и (3)
   * @param arrBack (1) -- массив, мутируется
   * @param index1 (2) --
   * @param index2 (3) --
   * @return RsuvResultAsau11
   */
  static elemsSwap(arrBack: Array<any>, index1: number, index2: number): RsuvResultAsau11 {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1)
    if (!RsuvTuArray.fnIndexValidIs(arrBack, index1)) return new RsuvResultAsau11(2)
    if (!RsuvTuArray.fnIndexValidIs(arrBack, index2)) return new RsuvResultAsau11(3)
    if (index1 === index2) {
      return new RsuvResultAsau11(0, true)
    }
    // ---
    const a = arrBack[index1]
    arrBack[index1] = arrBack[index2]
    arrBack[index2] = a
    return new RsuvResultAsau11(0, true)
  }

  /**
   * Заменяет значением (2), первый элемент (1) удовлетворяющий предикату (3).
   * Неудачей считаются (среди прочего): пустой массив (1), если предикат (3) не функция
   * @param arrBack (1) -- массив, мутируется
   * @param value (2) -- новое значение
   * @param predicate (3) -- вызывается для каждого элемента (1); аргументы - первый это сам элемент, второй это
   * индекс этого элемента
   */
  static elemUpdate(arrBack: Array<any>, value: any, predicate: (elem: any, index: number) => boolean) {
    if (!RsuvTuArray.fnArrValidIs(arrBack)) return new RsuvResultAsau11(1)
    if (!_.isFunction(predicate)) {
      return new RsuvResultAsau11(2)
    }
    if (arrBack.length < 1) {
      return new RsuvResultAsau11(3)
    }
    const ix = arrBack.findIndex((el, index) => predicate(el, index))
    if (ix === -1) {
      return new RsuvResultAsau11(4)
    }
    arrBack[ix] = value;
    return new RsuvResultAsau11(0, true)
  }

  /**
   * Возвращает TRUE если массив (1) содержит ВСЕ элементы присутствующие в массиве (2), при условии выбрасывания
   * из (2) всех повторяющихся элементов.
   * Если (1) или (2) это пустые массивы, то возвращает FALSE.
   * @param arr1
   * @param arr2
   */
  static containsAll(arr1: any[], arr2: any[]): boolean {
    if (arr1.length < 1 || arr2.length < 1) return false;
    const arr3 = _.uniq(arr2)
    return _.intersection(arr1, arr3).length === arr3.length
  }

  static fnIndexValidIs(arr: Array<any>, index: number) {
    if (index < 0) {
      return false
    }
    return index <= (arr.length - 1);
  }

  static fnIndexValidIsB(arr: Array<any>, index: number) {
    if (index < 0) {
      return false
    }
    return index <= (arr.length);
  }

  static fnArrValidIs(arr: Array<any>) {
    return !!_.isArray(arr);
  }
}
