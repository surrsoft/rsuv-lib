import { RsuvBnuwNT } from '.';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 * Представляет целое число, положительное, отрицательное, ноль, но не дробное, NaN, Infinity и т.п.
 */
export declare class RsuvTxNumInt implements RsuvBnuwNT {
    val: number;
    constructor(val: number);
    bnuwIsValid(): RsuvResultBoolPknz;
}
