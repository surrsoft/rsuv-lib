import { RsuvTxStringAB } from './RsuvTxStringAB';
import { RsuvEnSort } from './RsuvEnSort';
/**
 * Представление сортировки чего-либо абстрактного, обозначенного идентификатором
 */
export declare class RsuvTxSort {
    id: RsuvTxStringAB;
    sortDirect: RsuvEnSort;
    /**
     * Бросает исключение если идентификатор (1) невалиден
     *
     * @param id (1) -- условный идентификатор
     * @param sortDirect (2) -- направление сортировки
     */
    constructor(id: RsuvTxStringAB, sortDirect: RsuvEnSort);
}
