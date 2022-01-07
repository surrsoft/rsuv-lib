import { RsuvTxStringAC } from './RsuvTxStringAC';
import { RsuvEnSort } from './RsuvEnSort';
/**
 * Представление сортировки чего-либо абстрактного, обозначенного идентификатором
 */
export declare class RsuvTxSort {
    id: RsuvTxStringAC;
    sortDirect: RsuvEnSort;
    /**
     *
     * @param id (1) -- условный идентификатор
     * @param sortDirect (2) -- направление сортировки
     * @throws Error если идентификатор (1) невалиден
     */
    constructor(id: RsuvTxStringAC, sortDirect: RsuvEnSort);
}
