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
/**
 * Используется в RsuvTuTree.uniqValuesIs()
 */
export interface RsuvAsau91 {
    /**
     * Значение которое повторяется
     */
    value: any;
    /**
     * Сколько раз оно повторяется
     */
    count: number;
    /**
     * На каких индексах располагаются эти значения в исходном массиве
     */
    indexes: number[];
}
export declare enum RsuvAsau92 {
    SUCCESS_CODE_1 = "1",
    SUCCESS_CODE_2 = "2",
    ERR_CODE_1 = "100"
}
export declare class RsuvTuTree {
    /**
     * Собирает из *объектов значения поля (2). *Объекты ищет как в (1), если (1) это массив, так и во всех полях (3),
     * если они массивы, рекурсивно.
     *
     * ПОНЯТИЯ
     * -- *объект - объект из (1) если (1) это массив, или объект из (3) если это массив. В *объекте ищется значение
     * поля (2)
     *
     * Моё видео-объяснение - https://www.notion.so/surr/video-220515-1250-dfeab95377e74c238c1eb066b51f730c
     *
     * @param obj (1) -- например [{id: 1, childs: [{id: 3}]}, {id: 2}]
     * @param fieldValueName (2) -- например 'id'
     * @param fieldChildsName (3) -- например 'childs'; если значение falsy то искать в этом поле не будет
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
    /**
     * Проверяет на уникальность поле (2) объектов из (1). Если они все уникальны, то возвращает пустой массив, иначе
     * возвращает массив тех значений из (2) которые повторяются и то сколько раз они повторяются, и на каких индексах
     * эти повторы располагаются
     * @param arr (1) --
     * @param fieldName (2) -- например 'profile.name'
     * @param errInit (3) -- если TRUE то, если хоть в одном объекте из (1) не будет поля (2), то будет возвращён неуспех
     */
    static uniqValuesIs(arr: object[], fieldName: RsuvTxFieldNameLodashB, errInit: boolean): RsuvResultTibo<RsuvAsau91[]>;
    /**
     * Проходит по всем(*A*) сущностям (1), рекурсивно, и возвращает те их них (в виде массива объектов), для которых (2) даёт TRUE.
     *
     * (*A*) если (3) is FALSY по прекращает поиск после первой же находки.
     *
     * @param entry (1) -- массив или объект, например {aa: 1, bb: { cc: 3 }}
     * @param predicate (2) -- 1-параметр это ключ сущности, 2-й это значение сущности; например (key) => key === 'cc'
     * @param isEvery (3) -- например true
     * @return например [{ cc: 3 }]
     */
    static findDeepBy(entry: object | any[], predicate: (key: string | number, value: any) => boolean, isEvery: boolean): any[];
}
