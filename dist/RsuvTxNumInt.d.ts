/**
 * Представляет целое число, положительное, отрицательное, ноль, но не дробное, NaN, Infinity и т.п.
 */
import { RsuvBnuwNT } from '.';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
export declare class RsuvTxNumInt implements RsuvBnuwNT {
    val: number;
    constructor(val: number);
    bnuwIsValid(): RsuvResultBoolPknz;
}
