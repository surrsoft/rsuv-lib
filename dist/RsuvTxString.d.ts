import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Представляет строку не нулевой длины
 */
export declare class RsuvTxString implements RsuvBnuwNT {
    val: string;
    constructor(val: string);
    bnuwIsValid(): RsuvResultBoolPknz;
}
