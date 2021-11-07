import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxStringAB } from './RsuvTxStringAB';
/**
 * Представляет строку которая: (не нулевой длины) И (состоит только из символов [a-zA-Z0-9_]) И (начинается не с цифры)
 */
export declare class RsuvTxStringABB extends RsuvTxStringAB {
    bnuwIsValid(): RsuvResultBoolPknz;
}
