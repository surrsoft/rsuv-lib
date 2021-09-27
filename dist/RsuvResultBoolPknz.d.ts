/**
 * [[pknz]]
 */
export declare class RsuvResultBoolPknz {
    readonly success: boolean;
    readonly errCode: string;
    readonly errMessage: string;
    constructor(success?: boolean, errCode?: string, errMessage?: string);
    /**
     * Возвращает информацию о том какие элементы из (1) являются {success: true, ...} а какие {success: false, ...}
     * @param elems (1) --
     */
    static infoMulti(elems: RsuvResultBoolPknz[]): RsuvT2;
    /**
     * Возвращает TRUE если ВСЕ элементы (1) являются {success: true, ...}.
     * Если elems это пустой массив, то возвращает FALSE
     * @param elems (1) --
     */
    static successAllIsSugar(elems: RsuvResultBoolPknz[]): RsuvResultBoolPknz;
}
export declare type RsuvT2 = {
    success: RsuvResultBoolPknz[];
    notSuccess: RsuvResultBoolPknz[];
};
