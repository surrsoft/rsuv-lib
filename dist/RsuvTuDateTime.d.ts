export declare enum DATETIME {
    YATA = "yata",
    NECZ = "necz",
    RVUO = "rvuo"
}
export declare class ResultAsau36<T> {
    success: boolean;
    value: T;
    code: number;
    constructor(success: boolean, value: T, code: number);
}
/**
 * Преобразование формата [yata] (1) в формат [rvuo].
 * @param yata {number} (1) -- [yata], например 1637347161129
 * @return null если (1) не finite-число
 */
export declare function rvuoFromYata(yata: number | any): string | null;
export declare function yataFromRvuo(rvuo: string | any): ResultAsau36<number>;
export declare function yataIs(yata: number | any): boolean;
/**
 * Возвращает [necz] ([yata] как строка) от (1) если (1) это валидный [rvuo], иначе возвращает null
 * @param rvuo (1) -- [rvuo], например '2021-12-10T12:04'
 */
export declare function rvuoIs(rvuo: string | any): string | null;
