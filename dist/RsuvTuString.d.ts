import { RsuvTxString } from './RsuvTxString';
import { RsuvResultTibo } from './RsuvResultTibo';
/**
 * Возвращает TRUE если строка str это falsy, строка нулевой длины, или строка из одних пробелов
 *
 * source [210217114100]
 */
export declare function isEmptyOrWhitespaces(str: any): Boolean;
/**
 * ID [[210713104651]] rev 1 1.0 2021-07-13
 * source ID [210518234642] rev 1 1.0 2021-05-18
 *
 * Возвращает сколько раз строка (2) встречается в строке (1).
 * Чувствительна к регистру.
 * Если не находит вхождений, и в невалидных случаях, возвращает 0.
 * @param target string (1) -- например 'aba'
 * @param substr string (2) -- например 'a'
 * @return number например 2
 */
export declare function substrCount(target: string, substr: string): number;
/**
 * ID [[210713104605]] rev 1 1.0.0 2021-07-13
 * source ID [210518234643] rev 1 1.0 2021-05-19
 *
 * {тоже что и А только не чувствительна к регистру}
 *
 * Возвращает сколько раз строка (2) встречается в строке (1).
 * Не чувствительна к регистру.
 * Если не находит вхождений, и в невалидных случаях, возвращает 0.
 * @param target string (1) -- например 'aba'
 * @param substr string (2) -- например 'A'
 * @return number например 2
 */
export declare function substrCountB(target: string, substr: string): number;
/**
 * Возвращает информацию о том в каких местах строки (1) встречается строка (2).
 * Допускает содержание в (2) символов считающихся специальными для регулярных выражений - экранирует их.
 * ID [[210801094836]] rev 1 1.0.0 2021-08-01
 * @param target (1) --
 * @param substr (2) --
 * @param ignoreCase (3) -- TRUE если нужно игнорировать регистр символов
 * @return RsuvT7[] - пустой массив если вхождений не найдено и при нештатах
 */
export declare function substrIndexes(target: string, substr: string, ignoreCase: boolean): RsuvT7[];
/**
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ей, имеет ли с ней полное соответствие. Вся эта информация проверяется для
 * двух варинатов - с учетом регистра и без учета регистра символов (этим отличается от версии А текущей функции)
 *
 * @param strTarget (1) --
 * @param strSub (2) --
 * @return RsuvResultTibo<RsuvT5>
 */
export declare function stringsTwoInfoB(strTarget: RsuvTxString, strSub: RsuvTxString): RsuvResultTibo<RsuvT5>;
/**
 * Предоставляет полную информацию о том как строка (2) соотносится со строкой (1), например содержит ли (1) подстроку
 * (2), начинается ли с неё, заканчивается ли ей, имеет ли с ней полное соответствие, на каких индексах начинается и
 * заканчивается подстрока (2) в строке (1). Вся эта информация проверяется для
 * двух варинатов - с учетом регистра и без учета регистра символов (3)
 * ID [[210801103621]] rev 1 1.0.0 2021-08-01
 * @param strTarget (1) --
 * @param strSub (2) --
 * @param ignoreCase (3) -- TRUE если нужно игнорировать регистр символов
 * @return RsuvResultTibo<RsuvT4>
 */
export declare function stringsTwoInfo(strTarget: RsuvTxString, strSub: RsuvTxString, ignoreCase?: boolean): RsuvResultTibo<RsuvT4>;
/**
 * [[asau24]]
 * СМ. ТАКЖЕ: [asau22]
 */
export declare enum RSUV_T3 {
    STARTED = "rsuv_t3_started",
    ENDED = "rsuv_t3_ended",
    CONTAINS = "rsuv_t3_contains",
    COMPLETE_MATCH = "rsuv_t3_complete_match"
}
/**
 * Учёт регистра символов
 */
export declare enum RSUV_T6_CASE {
    SENSITIVE = "rsuv_t6_case_sensitive",
    NOT_SENSITIVE = "rsuv_t6_not_case_sensitive"
}
export declare class RsuvT4 {
    containsCount: number;
    containsIndexes: RsuvT7[];
    rsuvT3: RSUV_T3[];
}
export declare class RsuvT5 {
    sensitive: RsuvT4;
    notSensitive: RsuvT4;
}
export declare class RsuvT7 {
    startIndex: number;
    endIndex: number;
    constructor(startIndex?: number, endIndex?: number);
}
