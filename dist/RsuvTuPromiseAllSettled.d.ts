/**
 * [[asau56]]
 * Статусы Promise.allSettled()
 */
export declare enum EnStatusAsau56 {
    REJECTED = "rejected",
    FULFILLED = "fulfilled"
}
export declare class RsuvAsau57 {
    ix: number;
    reason: any;
}
export declare class RsuvAsau67 {
    ix: number;
    value: any;
}
export declare class RsuvPElemAsau66 {
    status: EnStatusAsau56;
    reason?: string;
    value?: any;
}
/**
 * Утилиты для работы с Promise.allSettled()
 */
export declare class RsuvTuPromiseAllSettled {
    /**
     * Извлекает reason-ы "реджектнутых" промисов
     * @param pResults
     */
    static rejected(pResults: Array<RsuvPElemAsau66>): Array<RsuvAsau57>;
    /**
     * Извлекает value-ы успешных промисов
     * @param pResults
     */
    static fulfilled(pResults: Array<RsuvPElemAsau66>): Array<RsuvAsau67>;
    /**
     * Возвращает TRUE если все результаты в (1) являются успешными
     * @param pResults
     */
    static isAllSuccess(pResults: Array<RsuvPElemAsau66>): boolean;
    /**
     * Возвращает TRUE если *pElem (1) обладает статусом (2)
     * @param pElem
     * @param status
     */
    static pElemIs(pElem: RsuvPElemAsau66, status: EnStatusAsau56): boolean;
    /**
     * Для каждого *pElem из (1) вызвает (2) если *pElem is fulfilled или (3) если *pElem is rejected, и результат (2)(3)
     * добавляет в итоговый массив
     * @param pResults (1) --
     * @param cbFulfilled (2) --
     * @param cbRejected (3) --
     */
    static handle<T, S>(pResults: Array<RsuvPElemAsau66>, cbFulfilled: (value: any) => T, cbRejected: (reason?: string) => S): Array<T | S>;
}
