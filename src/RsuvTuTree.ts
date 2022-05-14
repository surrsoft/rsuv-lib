/**
 работа с "деревом" которое образуют поля объектов
 */
import { RsuvResultTibo } from './RsuvResultTibo';
import _ from 'lodash';
import { RsuvTxFieldNameLodashB } from './RsuvTxFieldNameLodashB';

export interface RsuvAsau89 {
  value: string,
  ids: string[]
}

export enum RsuvAsau90 {
  SUCCESS_CODE_1 = '1',
  SUCCESS_CODE_2 = '2'
}

export class RsuvTuTree {
  /**
   * Рекурсивно проходит по всем собственным полям (2) объекта (1) и возвращает их значения в виде массива.
   * Детей ищет в собственном поле (3) объектов дерева
   * @param obj (1) -- например [{id: 1, childs: [{id: 3}]}, {id: 2}]
   * @param fieldValueName (2) -- например 'id'
   * @param fieldChildsName (3) -- например 'childs'
   * @return например [1, 3, 2]
   */
  static values(obj: any, fieldValueName: string, fieldChildsName: string) {

    function recurs(arrBack: Array<any>, elems: Array<any>) {
      elems.forEach(obj => {
        if (obj.hasOwnProperty(fieldValueName)) {
          arrBack.push(obj[fieldValueName])
        }
        const childs = obj[fieldChildsName]
        if (childs && Array.isArray(childs) && childs.length > 0) {
          recurs(arrBack, childs)
        }
      })
    }

    const result: Array<any> = []
    if (Array.isArray(obj)) {
      recurs(result, obj)
    } else {
      if (obj.hasOwnProperty(fieldValueName)) {
        result.push(obj[fieldValueName])
      }
      const childs = obj[fieldChildsName]
      if (childs && Array.isArray(childs) && childs.length > 0) {
        recurs(result, childs)
      }
    }
    return result;
  }

  /**
   * Подсчитывает строки из поля (2) объектов массива-объектов (1). В роли количества выступает массив ID из поля (3)
   * объектов.
   * Числовые значения из (2) и (3) преобразуются к строке.
   *
   * Моё видео-объяснение: https://www.notion.so/surr/video-220514-2257-6195c03c8fe3412b846401d181f6f6c0
   *
   * @param arr (1) -- массив объектов, например [
   *         {name: 'name1', tags: ['tag1', 'tag2']},
   *         {name: 'name2', tags: ['tag2', 'tag3']},
   *       ]
   * @param fieldNameValues (2) -- поле содежащее массив string | number, например 'tags'
   * @param fieldNameId (3) -- поле содержащее идентификатор типа string | number, например 'name'
   * @return например { success: true, value: [{value: 'tag1', ids: ['name1'], ...}], ...}
   */
  static accum(
    arr: Array<object>,
    fieldNameValues: RsuvTxFieldNameLodashB,
    fieldNameId: RsuvTxFieldNameLodashB
  ): RsuvResultTibo<RsuvAsau89[]> {

    /**
     * Добавляет (или не добавляет) в аккумулятор (1) запись
     * @param acc
     * @param key
     * @param id
     */
    function fnToAcc(acc: Map<string, string[]>, key: string, id: string) {
      if (!acc.has(key)) {
        acc.set(key, [id])
      } else {
        const arr0 = acc.get(key);
        arr0!.includes(id) || arr0!.push(id);
      }
    }

    if (arr.length > 0) {
      // --- acc
      const acc = new Map<string, string[]>()
      arr.map(elObj => {
        const values = _.get(elObj, fieldNameValues, [])
        if (_.isArray(values) && values.length > 0) {
          values.map(elVal => {
            if (_.isString(elVal) || _.isFinite(elVal)) {
              const elVal0 = elVal + '';
              const id = _.get(elObj, fieldNameId);
              const id0 = _.isString(id) ? id : _.isFinite(id) ? String(id) : ''
              fnToAcc(acc, elVal0, id0)
            }
          })
        }
      })
      // --- преобразуем acc к RsuvAsau89[]
      const ret: RsuvAsau89[] = []
      acc.forEach((val: string[], key: string) => {
        ret.push({value: key, ids: val})
      })
      // ---
      return new RsuvResultTibo<RsuvAsau89[]>({success: true, value: ret, successCode: RsuvAsau90.SUCCESS_CODE_1})
    }

    return new RsuvResultTibo({success: true, value: [], successCode: RsuvAsau90.SUCCESS_CODE_2})
  }
}
