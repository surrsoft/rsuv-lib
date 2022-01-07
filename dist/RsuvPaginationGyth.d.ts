/**
 * [[gyth]]
 * Сущность для пагинации. Передаём в конструктор "общее кол-во элементов" и "кол-во элементов на странице", и затем
 * по "номеру страницы" узнаём начальный и конечный индексы с помощью метода {@link indexesByPageNum}
 */
export declare class RsuvPaginationGyth {
    readonly elemsCount: number;
    readonly elemsPerPageCount: number;
    /**
     * Количество страниц
     */
    readonly pageCount: number;
    /**
     * При интанцировании вычисляет поле {@link pageCount}
     *
     * @param elemsCount (1) -- общее количество элементов
     * @param elemsPerPageCount (2) -- элементов на одной странице
     */
    constructor(elemsCount?: number, elemsPerPageCount?: number);
    /**
     *
     * @param pageNum (1) -- 1+, если больше реального количества страниц, то возвращаются данные для фактичесчки последней
     * страницы
     */
    indexesByPageNum(pageNum: number): {
        indexStart: number;
        indexLast: number;
    };
    elemsByPageNum(elems: any[], pageNum: number): any[];
}
