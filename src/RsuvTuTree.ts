/**
 работа с "деревом" которое образуют поля объектов
 */
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
}
