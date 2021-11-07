import { RsuvResultBoolPknz } from './RsuvResultBoolPknz';
import { RsuvTxString } from './RsuvTxString';
/**
 * Представляет строку которая: (не нулевой длины) И (не состоит из одних пробелов/переносов)
 */
export declare class RsuvTxStringB extends RsuvTxString {
    bnuwIsValid(): RsuvResultBoolPknz;
}
