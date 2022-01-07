import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxString } from './RsuvTxString';
/**
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов)
 */
export declare class RsuvTxStringAD extends RsuvTxString {
    bnuwIsValid(): RsuvResultBoolPknz;
}
