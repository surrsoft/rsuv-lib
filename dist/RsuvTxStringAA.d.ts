import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxString } from './RsuvTxString';
/**
 * Представляет строку которая: (не нулевой длины) И (не содержит пробелов/переносов)
 */
export declare class RsuvTxStringAA extends RsuvTxString {
    bnuwIsValid(): RsuvResultBoolPknz;
}
