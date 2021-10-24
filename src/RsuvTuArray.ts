import _ from 'lodash';
import { RsuvResultAsau11 } from './RsuvResultAsau11';

/**
 * Утилитные статические методы для работы с массивами
 */
export class RsuvTuArray {

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