import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Представляет строку не нулевой длины
 *
 * ID [[1636807341]]
 *
 * @implements RsuvBnuwNT
 */
export declare class RsuvTxString implements RsuvBnuwNT {
    val: string;
    constructor(val: string);
    bnuwIsValid(): RsuvResultBoolPknz;
}
