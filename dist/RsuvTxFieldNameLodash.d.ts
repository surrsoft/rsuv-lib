import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Представление для имени поля объекта, как единичного, так и составного через точку '.' (в lodash стиле).
 * Примеры: 'name', 'user.profile', 'users.0.name'
 */
export declare class RsuvTxFieldNameLodash implements RsuvBnuwNT {
    val: string;
    constructor(val: string);
    bnuwIsValid(): RsuvResultBoolPknz;
}
