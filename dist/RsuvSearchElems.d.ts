/**
 * ID [[1636805160]]
 *
 * Представление нескольких RsuvSearchElem (ID [1636803407]) применяемых
 * по правилу "И".
 *
 * Например, если элемента два, то поиск считается
 * успешным если успешен поиск для элемента 1 "И" для элемента 2
 */
export declare class RsuvSearchElems {
    elems: RsuvSearchElems[];
    constructor(elems: RsuvSearchElems[]);
}
