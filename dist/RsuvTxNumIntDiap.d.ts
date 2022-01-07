import { RsuvBnuwNT } from './RsuvBnuwNT';
import { RsuvTxNumIntAB } from './RsuvTxNumIntAB';
import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
/**
 Представление диапазона целых положительных чисел (>= 0), второе число >= первого
 */
export declare class RsuvTxNumIntDiap implements RsuvBnuwNT {
    indexStart: RsuvTxNumIntAB;
    indexEnd: RsuvTxNumIntAB;
    constructor(indexStart: RsuvTxNumIntAB, indexEnd: RsuvTxNumIntAB);
    bnuwIsValid(): RsuvResultBoolPknz;
}
