/**
 работа с "деревом" которое образуют поля объектов
 */
import { RsuvResultTibo } from './RsuvResultTibo';
import { RsuvTxFieldNameLodashB } from './RsuvTxFieldNameLodashB';
/**
 * Представление *рез-объекта (см. RsuvTuTree.accum() )
 */
export interface RsuvAsau89 {
    value: string;
    ids: string[];
}
/**
 * Используется в RsuvTuTree.accum()
 */
export declare enum RsuvAsau90 {
    SUCCESS_CODE_1 = "1",
    SUCCESS_CODE_2 = "2"
}
/**
 * Используется в RsuvTuTree.accum().
 * Префикс используемый если не найден валидный ID *элемента.
 */
export declare const RSUV_SPC_ID_PLUG_PREFIX = "rsuv-spc-id-plug-";
export declare class RsuvTuTree {
    /**
     * Рекурсивно проходит по всем собственным полям (2) объекта (1) и возвращает их значения в виде массива.
     * Детей ищет в собственном поле (3) объектов дерева
     * @param obj (1) -- например [{id: 1, childs: [{id: 3}]}, {id: 2}]
     * @param fieldValueName (2) -- например 'id'
     * @param fieldChildsName (3) -- например 'childs'
     * @return например [1, 3, 2]
     */
    static values(obj: any, fieldValueName: string, fieldChildsName: string): any[];
    /**
     * Подсчитывает (аккумулирует) *строки. Для каждой *строки создаёт *рез-объект.
     * Числовые значения из (2) и (3) преобразуются к строке.
     * Если *ид-значение это не строка и не целое число, либо поля (3) в *элементе нет, то генерирует специальную
     * ID-заглушку с префиксом "{@link RSUV_SPC_ID_PLUG_PREFIX} + число-соответствующее-индексу-*элемента".
     * Регистр символов *строк учитывается.
     * Если *строка повторяется в *массиве-тегов несколько раз, то и *ид-значение будет встречаться несколько раз
     * в *рез-объекте если (4) is FALSE, иначе только один раз
     *
     * Моё видео-объяснение: https://www.notion.so/surr/video-220514-2257-6195c03c8fe3412b846401d181f6f6c0
     *
     * ПОНЯТИЯ
     * -- *массив - массив объектов (1)
     * -- *элемент - отдельный элемент *массива
     * -- *массив-тегов - массив из поля (2) *элемента
     * -- *ид-значение - содержимое поля (3) *элемента
     * -- *строка - элемент *массива-тегов
     * -- *рез-объект, тип {@link RsuvAsau89}  - объект описывающий результат по отдельной *строке; имеет вид
     * {value: X, ids: Y[]},
     * где X - это *строка, а Y - это массив *ид-значений *элементов где эта *строка встречается
     *
     * @param arr (1) -- массив объектов, например [
     *         {name: 'name1', tags: ['tag1', 'tag2']},
     *         {name: 'name2', tags: ['tag2', 'tag3']},
     *       ]
     * @param fieldNameValues (2) -- поле содежащее массив string | number, например 'tags'
     * @param fieldNameId (3) -- поле содержащее идентификатор типа string | number, например 'name'
     * @param isUniqueIds (4) --
     * @return например { success: true, value: [{value: 'tag1', ids: ['name1'], ...}], ...}
     */
    static accum(arr: Array<object>, fieldNameValues: RsuvTxFieldNameLodashB, fieldNameId: RsuvTxFieldNameLodashB, isUniqueIds: boolean): RsuvResultTibo<RsuvAsau89[]>;
}
